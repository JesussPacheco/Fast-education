# Deployment to IBM Cloud Foundry

## SingUp

```
https://ibm.com/academic
```

## Login

```
https://cloud.ibm.com/login
```

## Download Cloud Foundry CLI

```
https://github.com/cloudfoundry/cli/releases
```

## Unset Cloud Foundry API

```
$ cf api https://api.us-south.cf.cloud.ibm.com --unset
```

## Login to IBM Cloud Foundry

```
$ cf login
API endpoint: https://api.us-south.cf.cloud.ibm.com
Email: pcsiebau@upc.edu.pe
Password: YourStrongPasswordHere
```

## IBM Cloud Foundry Orgs

```
$ cf orgs
```

## Generate Prod Build

```
$ npm run build
```

## Tip - Cloud Foundry Environment Variables

```
Strings containing the following characters must be quoted:
:, {, }, [, ], ,, &, *, #, ?, |, -, <, >, =, !, %, @, \.
```

## Deploy App

```
$ cd dist
$ cf push --no-start

u201726085@upc.edu.pe
Gimaj@2011

cf set-env fast-educationJesusv5 ENVIRONMENT prod
- cf set-env <app-name> BANKING_DDD_NEST_MYSQL mysql://{user}:{password}@{host}:{port}/{database}
$ cf set-env fast-educationJesusv5 FAST_EDUCATION_DDD_NEST_MYSQL mysql://admin:adminadmin@mysql8.cselj9r9ujlf.us-east-2.rds.amazonaws.com:3306/fast-education


$ cf env <app-name>

$ cf start fast-educationJesusv5
# if your application is not listening on 8080 then the health check will fail.
```

## List Apps

```
$ cf apps
```

## Scale Out

```
$ cf scale <app-name> -i 2
$ cf scale <app-name> -i 3
$ cf scale <app-name> -i 5
$ cf scale <app-name> -i 10
$ cf scale <app-name> -i 30
$ cf scale <app-name> -i 50
$ cf scale <app-name> -i 64
```

## Scale Up - Memory

```
$ cf scale <app-name> -m 128M
$ cf scale <app-name> -m 256M
$ cf scale <app-name> -m 512M
$ cf scale <app-name> -m 1G
$ cf scale <app-name> -m 2G
$ cf scale <app-name> -m 3G
$ cf scale <app-name> -m 4G
```

## Scale Up - Disk

```
$ cf scale <app-name> -k 2G
```

## Delete App

```
$ cf delete <app-name> -r -f
```
