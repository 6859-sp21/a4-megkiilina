# a4-megkiilina
a4-megkiilina created by GitHub Classroom

instructions:
1. clone your own copy of the repo
```
$ git clone https://github.com/6859-sp21/a4-megkiilina.git
```

2. make your own branch with your name. mine is megan.
```
$ git checkout -b megan
```
your new branch contains what was on "main," but now when you commit it will be independent from main. you're now on your new branch and not on main anymore.

4. push the branch to remote
```
$ git push origin megan
```

5. commit to your branch when you feel like it
```
$ git add (whatever path you want to add)
$ git commit -m "message"
$ git push origin megan
```

6. pull from main every so often to make sure you don't fall behind on particular changes. may ask you to resolve merge conflicts
```
$ git pull origin main
```

7. when you have a _fully functioning_ change, switch to main then merge your branch. will probably ask you to resolve merge conflicts
```
$ git checkout main
$ git merge megan
```

beep boop, all set.
more detailed instructions: https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
