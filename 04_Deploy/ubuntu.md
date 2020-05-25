# Ubuntu 





[주요 리눅스 명령어](https://zetawiki.com/wiki/주요_리눅스_명령어)

- User 목록 확인하기

  - 전체 목록

    ```python
    cat /etc/passwd
    cut -f1 -d: /etc/passwd
    ```

  - bash 사용자 목록

    useradd로 계정을 만들면 기본적으로 /bin/bash 환경이 적용된다. bash 사용자 목록이 의미 있는 경우가 많다.

    ```python
    grep /bin/bash /etc/passwd
    grep /bin/bash /etc/passwd | cut -f1 -d:
    ```

- 파일 이동하기

  - [local 에서 AWS EC2 로 파일 복사하기](https://www.sallys.space/blog/2017/11/28/aws-scp/)

    ```
    scp -i ---.pem dist.zip ubuntu@ip:~/release
    ```

  - [리눅스 안에서 파일 이동 및 복사하기](https://www.manualfactory.net/10805)

    ```
    sudo cp database/user_address.csv /var/lib/mysql/schema_name/user_address.csv
    ```

