## Key Commands 
Up Arrow: Will show your last command
Down Arrow: Will show your next command
Tab: Will auto-complete your command
Ctrl + L: Will clear the screen
Ctrl + C: Will cancel a command
Ctrl + R: Will search for a command
Ctrl + D: Will exit the terminal

- man - manual for command (ex: man ls)
- whoami - show current logged in user
- date - shows date

# File System Navigation
pwd	Lists the path to the working directory
ls	List directory contents
ls -a	List contents including hidden files (Files that begin with a dot)
ls -l	List contents with more info including permissions (long listing)
ls -r	List contents reverse order
cd	Change directory to home
cd [dirname]	Change directory to specific directory
cd ~	Change to home directory
cd ..	Change to parent directory
cd -	Change to previous directory (which could be different than the parent of course)
find [dirtosearch] -name [filename]	Find location of a program

# Modifying Files & Directories
mkdir [dirname]	Make directory
touch [filename]	Create file
rm [filename]	Remove file
rm -i [filename]	Remove directory, but ask before
rm -r [dirname]	Remove directory
rm -rf [dirname]	Remove directory with contents
rm ./*	Remove everything in the current folder
cp [filename] [dirname]	Copy file
mv [filename] [dirname]	Move file
mv [dirname] [dirname]	Move directory
mv [filename] [filename]	Rename file or folder
mv [filename] [filename] -v	Rename Verbose - print source/destination directory