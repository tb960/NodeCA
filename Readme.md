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





