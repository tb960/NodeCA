# Motivation
DO you know what is Https? And have you ever wonder how Https work? And what is Https based on?

![Https](/asset/lock.png)

This Image above show a website which is secure by using HTTPs and it has a certificate attached to verified it's security
When we request a website to a server, our browser will check whether the website we requested is secure by checking on the certificate that attached on it.

Below are the root certificates trusted by Mac OS by default:

link: https://support.apple.com/en-gb/HT212773

![This is the login page](/asset/trustedCert.png)

This means that whether we visit to the website where it's root certificate is in the list, it will be auto trusted by computer running on Mac OS.

If the website is not secure, where the certificate might not be present on the server of the website, you will see this message:

![This is the login page](/asset/notSecure.jpeg)

### But where does all the root certificate come from?

As we visit on the link on Apple support website, we can see some of the root CA are DigiCert, Certis, GlobalSign, GoDaddy etc.
Turns out they are just organization that register to become a Certified Authority to issue certificate. Furthermore, they might pay organization such as apple to list them as default trusted Root Certified Authority so that when user visit to website embedded with certificate issued by these CA, they will automaically get trusted. With this, they can provide a signing services to those web developer who wish to apply for a domain with certificate.

### Motivation

However in order to have a secure website with certificate, it is not compulsory to get the certificate from all the trusted Certified Authority, where you need to pay to get the service. It is possible for us to create our own certificate (self-signed certificate) and it shall work as secure as the one you get it from those trusted CA. Hence, in this project, we are going to recreate a Certified Authority which are able to self-signed the certificate that can be used in Modern Web and mobile Application.

# Research


## PART A : Digital Certificates
### What is SSL Certificate?
SSL certificate is a digital certificate that aithenticates a website's identity and enables an encrypted connection. SSl stands for Secure Sockets Layer, a security protocol that creates an encrypted link between a web server and a web browser.

Companies and organizations need to add SSL certificates to their websites to secure online transactions and keep customer information private and secure. In short, SSL keeps internet connections secure and prevents criminals from reading or modifying information transferred between two systems. When you see a padlock icon next to the URL in the address bar, that means SSL protects the website you are visiting

Since its inception about 25 years ago, there have been several versions of SSL protocol, all of which at some point ran into security troubles. A revamped and renamed version followed — TLS (Transport Layer Security), which is still in use today. However, the initials SSL stuck, so the new version of the protocol is still usually called by the old name.

### How do SSL certficates work?
SSL works by ensuring that any data transferred between users and websites, or between two systems, remains impossible to read. It uses encryption algorithms to scramble data in transit, which prevents hackers from reading it as it is sent over the connection. This data includes potentially sensitive information such as names, addresses, credit card numbers, or other financial details.

The process works like this:

    1) A browser or server attempts to connect to a website (i.e., a web server) secured with SSL.
    2) The browser or server requests that the web server identifies itself.
    3) The web server sends the browser or server a copy of its SSL certificate in response.
    4) The browser or server checks to see whether it trusts the SSL certificate. If it does, it signals this to the webserver.
    5) The web server then returns a digitally signed acknowledgment to start an SSL encrypted session.
    6) Encrypted data is shared between the browser or server and the webserver.

This process is sometimes referred to as an "SSL handshake." While it sounds like a lengthy process, it takes place in milliseconds.

When a website is secured by an SSL certificate, the acronym HTTPS (which stands for HyperText Transfer Protocol Secure) appears in the URL. Without an SSL certificate, only the letters HTTP – i.e., without the S for Secure – will appear. A padlock icon will also display in the URL address bar. This signals trust and provides reassurance to those visiting the website.

To view an SSL certificate's details, you can click on the padlock symbol located within the browser bar. Details typically included within SSL certificates include:

* The domain name that the certificate was issued for
* Which person, organization, or device it was issued to
* Which Certificate Authority issued it
* The Certificate Authority's digital signature
* Associated subdomains
* Issue date of the certificate
* The expiry date of the certificate
* The public key (the private key is not revealed)

### How to obtain an SSL certificate?
SSL certificates can be obtained directly from a Certificate Authority (CA). Certificate Authorities – sometimes also referred to as Certification Authorities – issue millions of SSL certificates each year. They play a critical role in how the internet operates and how transparent, trusted interactions can occur online.

The cost of an SSL certificate can range from free to hundreds of dollars, depending on the level of security you require. Once you decide on the type of certificate you require, you can then look for Certificate Issuers, which offer SSLs at the level you require.

Obtaining your SSL involves the following steps:
    1) Prepare by getting your server set up and ensuring your WHOIS record is updated and matches what you are submitting to the Certificate Authority (it needs to show the correct company name and address, etc.)
    2)Generating a Certificate Signing Request (CSR) on your server. This is an action your hosting company can assist with.
    3)Submitting this to the Certificate Authority to validate your domain and company details
    4)Installing the certificate they provide once the process is complete.
    
    Example CA: DigiCert, GoDaddy...

Once obtained, you need to configure the certificate on your web host or on your own servers if you host the website yourself.

### What happens when an SSL certificate expired?
SSL certificates do expire; they don't last forever. The Certificate Authority/Browser Forum, which serves as the de facto regulatory body for the SSL industry, states that SSL certificates should have a lifespan of no more than 27 months. This essentially means two years plus you can carry over up to three months if you renew with time remaining on your previous SSL certificate.

SSL certificates expire because, as with any form of authentication, information needs to be periodically re-validated to check it is still accurate. Things change on the internet, as companies and also websites are bought and sold. As they change hands, the information relevant to SSL certificates also changes. The purpose of the expiry period is to ensure that the information used to authenticate servers and organizations is as up-to-date and accurate as possible.

When an SSL certificate expires, it makes the site in question unreachable. When a user's browser arrives at a website, it checks the SSL certificate's validity within milliseconds (as part of the SSL handshake). If the SSL certificate has expired, visitors will receive a message to the effect of — "This site is not secure. Potential risk ahead".

### How to tell if a site has an SSL certificate?
The easiest way to see if a site has an SSL certificate is by looking at the address bar in your browser:

* If the URL begins with HTTPS instead of HTTP, that means the site is secured using an SSL certificate.
* Secure sites show a closed padlock emblem, which you can click on to see security details – the most trustworthy sites will have green padlocks or address bars.
* Browsers also show warning signs when a connection is not secure — such as a red padlock, a padlock which is not closed, a line going through the website's address, or a warning triangle on top of the padlock emblem.

## PART B: Digital Signatures

### Example of Signing Algorithm
    1) JWT Web Token
    2) RSA
    3) ECC
    4) ECDSA
    5) ELGamal signatures
    6) Schnorr Signatures

### What is Digital Signatures?
A digital signature is a mathematical technique used to validate the authenticity and integrity of a message, software or digital document. It's the digital equivalent of a handwritten signature or stamped seal, but it offers far more inherent security. A digital signature is intended to solve the problem of tampering and impersonation in digital communications.

Digital signatures can provide evidence of origin, identity and status of electronic documents, transactions or digital messages. Signers can also use them to acknowledge informed consent.

In many countries, including the United States, digital signatures are considered legally binding in the same way as traditional handwritten document signatures.

### How do digital signatures work?
Digital signatures are based on public key cryptography, also known as asymmetric cryptography. Using a public key algorithm, such as RSA (Rivest-Shamir-Adleman), two keys are generated, creating a mathematically linked pair of keys, one private and one public.

Digital signatures work through public key cryptography's two mutually authenticating cryptographic keys. The individual who creates the digital signature uses a private key to encrypt signature-related data, while the only way to decrypt that data is with the signer's public key.

If the recipient can't open the document with the signer's public key, that's a sign there's a problem with the document or the signature. This is how digital signatures are authenticated.

Digital signature technology requires all parties trust that the individual creating the signature has kept the private key secret. If someone else has access to the private signing key, that party could create fraudulent digital signatures in the name of the private key holder.

### Benefits of Digital Signatures
Security is the main benefit of digital signatures. Security capabilities embedded in digital signatures ensure a document is not altered and signatures are legitimate. Security features and methods used in digital signatures include the following:

- Personal identification numbers (PINs), passwords and codes. Used to authenticate and verify a signer's identity and approve their signature. Email, username and password are the most common methods used.
- Asymmetric cryptography. Employs a public key algorithm that includes private and public key encryption and authentication.
- Checksum. A long string of letters and numbers that represents the sum of the correct digits in a piece of digital data, against which comparisons can be made to detect errors or changes. A checksum acts as a data fingerprint.
- Cyclic redundancy check (CRC). An error-detecting code and verification feature used in digital networks and storage devices to detect changes to raw data.
- Certificate authority (CA) validation. CAs issue digital signatures and act as trusted third parties by accepting, authenticating, issuing and maintaining digital certificates. The use of CAs helps avoid the creation of fake digital certificates.
- Trust service provider (TSP) validation. A TSP is a person or legal entity that performs validation of a digital signature on a company's behalf and offers signature validation reports.

Other benefits to using digital signatures include the following:

- Timestamping. By providing the data and time of a digital signature, timestamping is useful when timing is critical, such as for stock trades, lottery ticket issuance and legal proceedings.
- Globally accepted and legally compliant. The public key infrastructure (PKI) standard ensures vendor-generated keys are made and stored securely. Because of the international standard, a growing number of countries are accepting digital signatures as legally binding.
- Time savings. Digital signatures simplify the time-consuming processes of physical document signing, storage and exchange, enabling businesses to quickly access and sign documents.
- Cost savings. Organizations can go paperless and save money previously spent on the physical resources and on the time, personnel and office space used to manage and transport them.
- Positive environmental impact. Reducing paper use also cuts down on the physical waste generated by paper and the negative environmental impact of transporting paper documents.
- Traceability. Digital signatures create an audit trail that makes internal record-keeping easier for business. With everything recorded and stored digitally, there are fewer opportunities for a manual signee or record-keeper to make a mistake or misplace something.

### How to create Digital Signatures?
![Digital Signature Process](/asset/signature.png)
To create a digital signature, signing software, such as an email program, is used to provide a one-way hash of the electronic data to be signed.

A hash is a fixed-length string of letters and numbers generated by an algorithm. The digital signature creator's private key is then used to encrypt the hash. The encrypted hash -- along with other information, such as the hashing algorithm -- is the digital signature.

The reason for encrypting the hash instead of the entire message or document is a hash function can convert an arbitrary input into a fixed-length value, which is usually much shorter. This saves time as hashing is much faster than signing.

The value of a hash is unique to the hashed data. Any change in the data, even a change in a single character, will result in a different value. This attribute enables others to use the signer's public key to decrypt the hash to validate the integrity of the data.

If the decrypted hash matches a second computed hash of the same data, it proves that the data hasn't changed since it was signed. If the two hashes don't match, the data has either been tampered with in some way and is compromised or the signature was created with a private key that doesn't correspond to the public key presented by the signer -- an issue with authentication.

A digital signature can be used with any kind of message, whether it is encrypted or not, simply so the receiver can be sure of the sender's identity and the message arrived intact. Digital signatures make it difficult for the signer to deny having signed something as the digital signature is unique to both the document and the signer and it binds them together. This property is called nonrepudiation.

Digital signatures are not to be confused with digital certificates. A digital certificate is an electronic document that contains the digital signature of the issuing CA. It binds together a public key with an identity and can be used to verify that a public key belongs to a particular person or entity.

Most modern email programs support the use of digital signatures and digital certificates, making it easy to sign any outgoing emails and validate digitally signed incoming messages. Digital signatures are also used extensively to provide proof of authenticity, data integrity and nonrepudiation of communications and transactions conducted over the internet.

### What is the use of Digital Signature in Certified Authority and Certificate Creation?
When the signer uses a certificate to digitally sign a document, other people (known as relying parties) can trust the digital signature because they trust the CA has done their part to ensure the signer matches their digital identity.

So, technically speaking the difference between a digital signature and digital certificate is that a certificate binds a digital signature to an entity, whereas a digital signature is to ensure that a data/information remain secure from the point it was issued. In other words: digital certificates are used to verify the trustworthiness of a person (sender), while digital signatures are used to verify the trustworthiness of the data being sent.

![Digital cert](/asset/createSign.png)

Creating a digital signature using digital certificates (private key)

#### Certified Authority and Digital Signature
In our case of a Certified Authority, first we need to have a root certificate which represent the identity of a Root Certifid Authority
Then if the Root Certified Authority need to issue a intermediate certificate or a client certificate, the root certificate have to sign the intermediate certificate before issuing it.
In this case, the Root CA should sign using it's private key
As such, the intermediate certificate issued by this root CA will have it's signature on it and other people can verified by using it's public key.


# Development

Google docs on the thought process of this development project:
https://docs.google.com/document/d/12X0XMLpoU9O1dnlYFOUSK2K0vNO04PpFbRqpkN32xbI/edit?usp=sharing


## Agile Development Approaches

![Agile](/asset/agile.png)
The agile approach is based on teamwork, close collaboration with customers and stakeholders, flexibility, and ability to quickly respond to changes. The basic building blocks of agile development are iterations; each one of them includes planning, analysis, design, development, and testing. The agile method doesn’t require comprehensive documentation at the beginning. Managers don’t need to plan much in advance because things can change as the project evolves. This allows for just-in-time planning. As one of the Agile Manifesto values suggests, putting – “working software over comprehensive documentation -“, the idea is to produce documentation with information that is essential to move forward, when it makes the most sense.

In this project, the development approaches adapted is mainly Agile.

## System Documentation

A System Documentation usually consists of the requirements document, architecture design, source code, validation docs, verification and testing info, and a maintenance or help guide.

### 1) Product Requirement Document

Requirements:
   1) Issued a new certificate
   2) Revoke a certificate
   3) validate list of certificate by providing an api to view the list of certificates
   4) Hierarchical Issuing of Certificate
   5) Hierarchical Revocation of Certificate
   6) Generate private key if request by user

Extra features:
   1) OSCP server
   2) CRL HTTP SERVER
   3) Download issued certificate files

Requirement flow:
   1) Issuing/hierarchical issuing a new Certificate  - user story
   ![This is the login page](/asset/login.png)
   2) hierarchical Revocation of certificate - admin story
   ![This is the login page](/asset/login.png)
   3) validate list of certificate - user/admin story
   ![This is the login page](/asset/login.png)
   4) generate private key if user ask
   ![This is the login page](/asset/login.png)
   5) generate certificate based on user CSR
   ![This is the login page](/asset/login.png)


#### Technology stacks used
```
   1) NodeJS
        |--- SHA256 for hashing of user password duing login using nodepkictl
   2) JavaScript
   3) OpenSSL  (ciphersuites applied)
        |--- X.509
        |--- SHA256: use to encrypt while generating request for certificate
        |--- genrsa: RSA algorithm for generating Private Key & Public Key in creating root, intermediate and client private key and root, intermediate and client certificate using 4096 bits
        `--- aes256: AES algorithm to encrypt Private Key generated by using symmetric algorithm
```


#### Software architecture 
* This is the software architecture used
![This is the login page](/asset/architecture.jpeg)

    1) Server is the server to handle request and to provide API for webClient user 
    2) Unlike normal web application that use MySQL or MongoDB as database to store data, as this is a Certified Authority where everything need to be very secure, hence, it is better to use a self-server file system server where you store all your certificate and data in a file system in hashed format
    3) In our case, we use an OCSP server to talk to the file system that have the data file for status of all certificate
    4) We also have a Certification Revocation List HTTP server running for the update of revoked certificate
    5) CRL is stored in .pem file.

# Design 

#### UI MOCK UP
* Login Screen
![This is the login page](/asset/login.png)
* Home page Screen
![This is the home page](/asset/home.png)
* CA Root and Intermediate Screen
![This is the Root and Intermediate Cert page](/asset/caCert.png)
* Certificate request Screen
![This is the Request page](/asset/request.png)
* Certificate Revocation Screen
![This is the Revoke page](/asset/revoke.png)
* List of Certificate Screen
![This is the List of Certificate page](/asset/listCert.png)


#### Structure

```
.. client::
.
|-- controllers         (where all the logic and request to server)                  
|-- static              (static file used in front end setting)              
|-- views               (front end code and structure)
|   `-- partials        (front end reusable header or footer)          
|-- data                (data file to store all your config, created when you first run the application)
|-- temp                (temp file to store all the temporary received certificate)
|-- app.js              (entry point of the application)             
|-- appclient.js        (Javascript request file)        
|-- config.default.yml  (default config file)          
|-- openssl_client.cnf  (default openssl config client file)    
|-- openssl_server.cnf  (default openssl config server file)            
`-- rootcheck.js        (checking of root certificate function)  
```

```
.. server::
.
|-- controllers         (where all the logic and request to server)
|-- data                (data file to store all the root, intermediate and user cert)
|   --- config
|   --- mypki
|   --- user.db         (where this store the user database to login using GUI)
|-- middleware          (middleware function)
|-- pkitemplate         (openssl config for all oscp, root, intermediate and clientcert)
|-- temp                (temporary directory created while creating hierarchical and certificate)
|-- api.js
|-- cerdb.js            (directory for reindex for list of certificate and certificate status)
|-- config.default.yml  (default config for the yml file)
|-- crl.js              (logic to create certificate revocation list)
|-- genpki.js           (run once when startup to create root and intermediate certificate folder and files)
|-- nodepkictl.js       (logic to create a user using command line)
|-- oscp-server.js
|-- publicDI.js         (public logic for non admin user)
`-- server.js           (server entry point)
```

# Use Of Code

## Requirements

- Node.js 10 LTS (recommended)
- NPM
- OpenSSL

## Setup instructions

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











