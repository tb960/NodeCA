# Motivation

Where do the certificate in your browser come from?
Explain on the certificate on mac
Why are they trusted? Turns out that we can be our own CA too if we have pay money for apple or google to trust us 

However, how to make it trusted? How a infrastructure of the certified authority works?

How a signature works and what are some of the cryptography techniques behind all these?



SSL certificate is a digital certificate that aithenticates a website's identity and enables an encrypted connection. SSl stands for Secure Sockets Layer, a security protocol that creates an encrypted link between a web server and a web browser.

Companies and organizations need to add SSL certificates to their websites to secure online transactions and keep customer information private and secure. In short, SSL keeps internet connections secure and prevents criminals from reading or modifying information transferred between two systems. When you see a padlock icon next to the URL in the address bar, that means SSL protects the website you are visiting

Since its inception about 25 years ago, there have been several versions of SSL protocol, all of which at some point ran into security troubles. A revamped and renamed version followed — TLS (Transport Layer Security), which is still in use today. However, the initials SSL stuck, so the new version of the protocol is still usually called by the old name.





# Research


# Development

A) Agile Development Approaches
<img>

The agile approach is based on teamwork, close collaboration with customers and stakeholders, flexibility, and ability to quickly respond to changes. The basic building blocks of agile development are iterations; each one of them includes planning, analysis, design, development, and testing. The agile method doesn’t require comprehensive documentation at the beginning. Managers don’t need to plan much in advance because things can change as the project evolves. This allows for just-in-time planning. As one of the Agile Manifesto values suggests, putting – “working software over comprehensive documentation -“, the idea is to produce documentation with information that is essential to move forward, when it makes the most sense.

In this project, the development approaches adapted is mainly Agile.

B) System Documentation

A System Documentation usually consists of the requirements document, architecture design, source code, validation docs, verification and testing info, and a maintenance or help guide.

B) 1) Product Requirement Document
   -requirement:
   i) Issued a new certificate
   ii) Revoke a certificate
   iii) validate list of certificate by providing an api to view the list of certificates
   iv) Hierarchical Issuing of Certificate
   v) Hierarchical Revocation of Certificate
   vi) Generate private key if request by user

   -extra features:
   i)OSCP server
   ii)CRL HTTP SERVER
   iii)Download issued certificate files

   Requirement flow:
   i) Issuing/hierarchical issuing a new Certificate  - user story
   ii) hierarchical Revocation of certificate - admin story
   iii) validate list of certificate - user/admin story
   iv) generate private key if user ask
   v) generate certificate based on user CSR


   2) Software or technolofy stack used
   3) Software architecture and design

# Design 

    1) UI mock up
    2) file structure
    3) 


# Use Of Code

## A) Setup instructions

    git clone https://github.com/tb960/CA.git
    cd server
    npm install  
    AFTER THAT, EXIT SERVER DIRECTORY 
    cd client
    npm install


### Configure NodeCA

There is an example config file "config.yml.default" which can be copied to "config.yml". Change config.yml to fit your environment. The passwords defined in config.yml will be used to create the PKI.
Please change the config file according to the example provided in the config.yml file, else the application will not run successfully


## Start all the things!

Start your API server:

    cd server
    node server.js

Start you client server:

    cd client
    node app.js

CA files in data/mypki will be created on first startup. Root Certificate and default Intermediate Certificate will be created on first startup if the data/mypki file is not found in the directory


## API user login

### Add new user

    node nodepkictl useradd --username user1 --password user1password

### Remove user

    node nodepkictl userdel --username user1


## API usage

API Request bodies consist of a "data" object containing parameters for the requested operation and an "auth" object containing username and password of the user:

    {
        data: {
            ... <request params>
        },
        auth: {
            username: "thomas",
            password: "test"
        }
    }

For some API calls authentication is not required.

API response bodies:

    {
        success: <bool>,
        <more attributes>
    }


## Examples

For better unstanding the general API usage: Two examples with cURL (the "-d" argument contains the JSON-formatted request)

List all issued certificates:

```
curl -H "Content-type: application/json" -d '{ "data": { "state":"all" }, "auth": { "username":"thomas", "password":"test" } }' http://localhost:8080/api/v1/certificates/list
```


Request certificate from CSR:

```
curl -H "Content-type: application/json" -d '{ "data": { "applicant":"Thomas", "csr":"---CERTIFICATE SIGNING REQUEST---", "lifetime":365, "type":"server" }, "auth": { "username":"thomas", "password":"test" } }' http://localhost:8080/api/v1/certificate/request
```



## Certificates

### Request certificate

    POST /api/v1/certificate/request/

    Request params:
    * applicant: <String> | Applicant, who requests certificate (for future usage)
    * csr: <String> | CSR data in PEM format
    * lifetime: <Int> (optional) | Lifetime of certificate in days
    * type: <Enum/String> (optional) | Certificate type. Can be 'server', 'client'. Defaults to 'server'

    Response attributes:
    * cert: <String> | certificate



### Revoke certificate

    POST /api/v1/certificate/revoke/

    Request params:
    * cert: <String> | Certificate to revoke in PEM format

    Response attributes: success


### Get certificate

    POST /api/v1/certificate/get/

    Request params:
    * serialnumber: <String> | Serial number of the certificate

    Response attributes:
    * cert: <String> | Certificate



### List certificates  

    POST /api/v1/certificates/list/

    Request params:
    * state: <Enum/String> | 'valid', 'expired', 'revoked', 'all'

    Response body:     
     {   
        success: <bool>,
        certs: [
            {
                state: <state>,
                expirationtime: <time>,
                revocationtime: <time>,
                serial: <serial>,
                subject: <subject>
             },
            ...
        ]
    }


## CAs

## Get CA certificate

(No auth required)

    POST /api/v1/ca/cert/get/

    Request params:
    * ca: <Enum/String> | Can be 'root', 'intermediate'
    * chain: (optional) | Whether to get full chain, for intermediate only

    Response body:
    * cert: <String> | CA certificate


## Errors

Example error response:

    {
        errors: [
            {
                code: 422,
                message: "Invalid data type"
            }
        ]
    }


### General error codes

* 100: Invalid / insufficient API input (see errormessage)
* 101: Internal server processing error.
* 200: Invalid authentication credentials

## Using the server via client

* By going to client directory, you can view the GUI version of the Certified authority via the port you speficied in the config file

* Or I had created a directory where you can use request certificates and manage your CA using command line interface


# NodeCA CLI Client

*A simple command-line client for the NodePKI server*


## Dependencies

* NodeJS
* NPM
* OpenSSL


## Setup

    cd nodeCLI-client
    npm install


## Configure

Copy config.default.yml to config/config.yml and set the settings according to your environment.


## Usage

### Display subcommand overview:

    node client help

### Display subcommand usage help:

    node client request --help

### Request new certificate

Create new key + certificate from scratch and store both in out/ directory. Lifetime: 7 days.

    node client request --lifetime 7 --out out/

Create new key + certificate from scratch, add intermediate cert to cert and store in out/ directory

    node client request --out out/ --fullchain

Create new certificate via existing .csr file and write certificate to out/cert.pem:

    node client request --csr certificate.csr --out out/cert.pem

Lifetime defaults to *cert_lifetime_default* setting in config.yml

Create a new client certificate:

    node client request --type client --out out/


### Get list of issued certificates

    node client list --state all

... to list all issued certificates.

Valid states:
* all
* valid
* expired
* revoked


### Get certificate by serial number

... and store certificate to out/cert.pem

    node client get --serialnumber 324786EA --out out/cert.pem


### Revoke issued certificate

    node client revoke --cert cert.pem


### Get CA certificates

Get root certificate:

    node client getcacert --ca root

Write root certificate to file:

    node client getcacert --ca root --out out/root.cert.pem

Get intermediate certificate:

    node client getcacert --ca intermediate

Get intermediate certificate + root certificate (=cert chain) and write to file:

    node client getcacert --ca intermediate --chain --out out/ca-chain.cert.pem











