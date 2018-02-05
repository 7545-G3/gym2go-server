require('shelljs/global')

const tempBranchName = 'deploy/' + Math.random().toString()
exec('git checkout -b ' + tempBranchName)
exec('git add -f build/')
exec('git commit -m "Added build"')
exec('git push heroku +HEAD:master')

exec('git checkout master')
exec('git branch -D ' + tempBranchName)