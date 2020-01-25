start: 

touch .gitignore 

gitignore

https://www.gitignore.io/api/python,django

$ pip freeze > requirements.txt

git init



이미 add, commit을 하고

git ignore에 추가하지 않은 것이 올라갔을 때

-> 이미 올라간 상태인 것

->  git rm -r .vscode : git에서도 삭제, 폴더까지 삭제

$ git rm -r --cached .vscode : 파일은 남아있고 git 에서만 삭제



이후 git 예시 대로

git remote add origin http://~

git push -u origin master



// 상대방은

git clone 하면 된다

pip install -r requirements.txt





// 팁은 담당하고 있는 폴더에서만 add 하는 것

git add accounts/

하면 git status에 다른 폴더가 바뀐 것은 있지만 올라가지는 않는다. 

commit 은 무조건 초록색만 올리기 때문에

