// Psuedo Asynchronous Processes
const readUser = async ({user, folder, files}) => {
  // Fetch the user from the database
  const dbUser = await someDatabaseFetch(user);
  return { dbUser, folder, files };
};

const getFolderInfo = async ({dbUser, folder, files}) => {
  // Get the folder information
  const folderInfo = await someFolderFetch(folder);
  return { dbUser, folderInfo, files };
};

const haveWriteAccess = async ({ dbUser, folderInfo, files }) => {
  // Check if the user has write access
  const hasAccess = await checkPermissions(dbUser, folderInfo);
  
  if (!hasAccess) {
    throw new Error("No write access to that folder");
  }
  
  return { hasAccess, dbUser, folderInfo, files };
};

const uploadToFolder = async ({ dbUser, folderInfo, files }) => {
  // Upload files to the folder
  await performUpload(dbUser, folderInfo, files);
  return 'Success!';
};

// 💭 --------------------------------------------------------------

// gibberish starting variables
const user = '123';
const folder = '456';
const files = ['a', 'b', 'c'];

// 💭 --------------------------------------------------------------

// 🔴 Imperative test function (No good!) 🔴
// async function uploadFiles({user, folder, files}) {
//   const dbUser = await readUser(user);
//   const folderInfo = await getFolderInfo(folder);
//   if (await haveWriteAccess({dbUser, folderInfo})) {
//     return uploadToFolder({dbUser, folderInfo, files});
//   } else {
//     throw new Error("No write access to that folder");
//   }
// }

// Enabling Declarative Composition Version Below (…vs. imperative composition above)
const asyncPipe = (...fns) => x => (
  fns.reduce(async (y, f) => f(await y), x)
);

// 🟢 Declarative test function refactored to use `asyncPipe()` (Good!) 🟢
const uploadFiles = asyncPipe(
  readUser,
  getFolderInfo,
  haveWriteAccess,
  uploadToFolder
);

// Invocation
uploadFiles({user, folder, files}).then(console.log).catch(console.error);