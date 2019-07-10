# Shot watcher web client

# Deploy on heroku
[Heroku dashboad ](https://dashboard.heroku.com/apps/shotwatcher/deploy/heroku-git)

**Important yarn is required in heroku**

In case error

```console
rm -rf node_modules
rm -rf build
rm yarn.lock
rm packages-log.log ***remove***
```

**Deploy**
```console
 git add .
 git commit -am "1.0.0"
 git push heroku master
 heroku open
```

Open https://shotwatcher.herokuapp.com/#/access
