# Database

* DB 정의

  1. 체계화 된 데이터의 모임 : 구조화하여 검색과 갱신을 효율적으로 함

  2. 통합 관리되는 정보의 집합

  3. 논리적으로 연관된 하나 이상의 자료의 모음

     => 자료 파일을 조직적으로 통합하여 중복을 없애고 구조화 한 자료의 집합체

* DB 장점
  1. 데이터 중복 최소화
  2. 데이터 무결성 : 정확한 정보를 저장함
  3. 데이터 일관성
  4. 데이터 독립성 : 물리적 / 논리적 독립성
  5. 데이터 표준화
  6. 데이터 보안 유지



* DBMS (database management system): 데이터베이스 관리 시스템
  * 데이터베이스 관리자, 사용자 및 응용 프로그램 등 다수의 사용자들이 [데이터베이스](https://ko.wikipedia.org/wiki/데이터베이스) 내의 데이터를 접근할 수 있도록 해주는 소프트웨어 도구의 집합이다. DBMS은 사용자 또는 다른 프로그램의 요구를 처리하고 적절히 응답하여 데이터를 사용할 수 있도록 해준다.

    

* RDBMS (Relational DBMS): 관계형 데이터베이스 관리 시스템

  * 관계형 모델을 기반으로 하는 데이터베이스 관리 시스템. 
  * MySQL, SQLite, ORACLE, MS SQL 등



* 관계형 데이터베이스 (Relational DB)
  	- 관계(relation)를 표현하기 위해 2차원 표(table)를 사용함
  	- 그림 01



* SQLite 
  * 서버 X, 응용 프로그램에 넣어 사용하는 데이터베이스
  * 구글 안드로이드 운영체제에 기본적으로 탑재 된 데이터베이스
  * 임베디드 소프트웨어에도 활용
  * 로컬에서 간단한 DB 구성 가능
  * 오픈소스



* 스키마 (schema) : DB의 자료의 구조, 제약조건(표현 방법, 관계)에 관련한 전반적인 명세를 기술한 것. column (email) : datatype (TEXT)
* 테이블 (table) : 열(column/field)과 행(record/values)의 모델을 사용해 조직된 데이터 요소들의 집합. SQL 데이터베이스에서는 테이블을 관계(relation)라고도 한다. 
* 열(Column) : 각 열에는 고유한 데이터 형식이 지정된다. Integer, text, null 등등
* 행(Row, 레코드) : 테이블의 데이터는 행에 저장된다. 고객정보가 저장된 행은 4개가 존재
* 기본키(PK, Primary Key) : 각 행(레코드)의 고유값, 반드시 설정해야하며, DB 관리 및 관계 설정시 주요하게 활용 된다. 





## SQL 개념

* SQL (Structured Query Language) 
  * 관계형 데이터베이스 관리시스템(RDBMS)의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어
  * RDBMS 에서 자료의 검색, 관리, DB 스키마 생성과 수정, DB 객체 접근 조정 관리를 위해 고안 되었다. 
* SQL 문법
  * DDL (Data Definition Language) : 데이터 정의 언어
    * DB 구조(테이블, 스키마)를 정의하기 위한 명령어: CREATE, DROP, ALTER
  * DML (Data Manipulation Language) : 데이터 조작 언어
    * 데이터를 저장, 수정, 삭제, 조회: INSERT, UPDATE, DELETE, SELECT
  * DCL (Data Control Language) : 데이터 제어 언어
    * DB 사용자의 권한 제어를 위한 언어: GRANT, REVOKE, COMMIT, ROLLBACK
* SQL Keyworkds
  * INSERT : 데이터 삽입(새로운 행 추가)
  * DELETE : 데이터 삭제(행 제거)  != DROP (테이블 삭제)
  * UPDATE : 데이터 갱신
  * SELECT : 데이터 검색 (read)

- Datatype
  - SQLite 는 동적 데이터 타입으로, 기본적으로 유연하게 데이터가 들어간다.
  - BOOLEAN은 없으며 정수 0, 1으로 저장된다.
  - INTEGER, TEXT, REAL, NUMERIC, BLOB 등 

