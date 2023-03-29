# The Impact of Insecure Design on Cybersecurity
![This is an image](https://i.ytimg.com/vi/2F1NzaWD0Wg/maxresdefault.jpg)
## Nicky Tabrizifar
### ICT, Fontys Hogescholen

### Abstract
 Insecure design was placed fourth in the OWASP (abbreviation for Open Web Application Security Project) in the top Ten Most Critical Web Application Security Risks list. It remains a critical issue in cybersecurity, the reasoning being is that it can leave products, systems, and processes vulnerable to security threats and attacks. This paper will be exploring the impact of insecure design on cybersecurity and explores the reasons why insecure design occurs. Through a review of the literature, the paper identifies common examples of insecure design, including hard-coded passwords, lack of encryption, weak authentication mechanisms, lack of access controls, and poorly designed user interfaces. We will also discuss the consequences of insecure design, including data breaches, financial losses, and damage to reputation. To address the issue of insecure design, the paper proposes a set of design principles and best practices that can be used to ensure that products and systems are designed with security in mind from the outset. The paper concludes that addressing insecure design is crucial to improving cybersecurity and protecting against security threats and attacks.   
 
 ### Introduction
Insecure design refers to a design approach that prioritizes ease of use and convenience over security. It is a problem that affects a wide range of systems. It can lead to serious security vulnerabilities that can be exposed by attackers to gain unauthorized access to sensitive data, ruin operations, or other forms of damage.
The most common example of insecure design is the use of weak or easily guessable passwords. Passwords are often the most weak point of unauthorized access, but if they are too short, simple, or based on easily guessable information like a user's name or birthdate, they can be easily given away. Insecure password design can lead to account takeover, data theft, and other forms of dangerous activity 'A04:2021 – Insecure Design', [https://owasp.org/Top10/A04_2021-Insecure_Design/](https://owasp.org/Top10/A04_2021-Insecure_Design/).
Another example is the failure to use encryption to protect sensitive data in transit and at rest. Encryption is a powerful tool for protecting data from unauthorized access, but it requires careful implementation and management to be effective. Insecure encryption design can lead to data leaks, identity theft, and other forms of cybercrime.
It can also be seen in the design of physical devices, such as smart home devices and Internet of Things (IoT) devices. These devices often lack basic security features, such as strong passwords or encryption, and may be vulnerable to hacking or other forms of malicious activity. 
Nevertheless, insecure design is often the result of a lack of emphasis on security during the design process. Designers and developers may prioritize ease of use, functionality, or other factors over security, leading to vulnerabilities that are difficult to address after the fact. To address the problem of insecure design, it is important to incorporate security considerations into the design process from the beginning. This can include conducting threat modeling exercises to identify potential security risks, implementing secure coding practices, and using secure design patterns and architectures.
In addition to incorporating security into the design process, it is important to regularly test and audit systems for security vulnerabilities. This can include conducting penetration testing to identify weaknesses in systems and applications, as well as regularly monitoring systems for signs of compromise or unauthorized activity.
Ultimately, insecure design is a serious problem that can have far-reaching consequences. By prioritizing security in the design process and regularly testing and auditing systems for vulnerabilities, organizations can reduce the risk of security breaches and protect sensitive data from unauthorized access. To address insecure design, we can use the DOT framework research methodology.

### DOT Framework
The DOT framework consists of three levels: The “What” of your research (the domains), The “Why” of your research (the trade-offs), and The “How” of your research (the strategies and methods)'The DOT Framework', [http://ictresearchmethods.nl/The_DOT_Framework.nl](http://ictresearchmethods.nl/The_DOT_Framework).
The domains in insecure design are the areas where security controls are lacking. These areas include authentication, authorization, input validation, output encoding, error handling, logging and auditing.

The trade-offs in insecure design are the risks associated with flaws in design and architecture. These risks include data breaches, data loss, unauthorized access to sensitive information, and more.

The strategies and methods in insecure design include threat modeling, secure design patterns, and principles. Threat modeling helps identify potential threats to the application. Secure design patterns provide a set of proven solutions to common security problems. Secure principles provide guidance on how to build secure applications.

### Preventing Insecure Design in my own Application
I am going to ensure that my app does not face any issues within Insecure Designing I have followed these steps:

- Secure authentication methods: I have used OAuth 2.0 that comes with the API to authenticate users and ensure that their credentials are secure.

- Validate user input: Validate all user input to prevent injection attacks.

- HTTPS: to ensure that all communication between my application and the Spotify API is secure.

- Secure storage methods: Store sensitive data such as access tokens securely.

- Dependencies up-to-date: Keeping my dependencies up-to-date to ensure that I am using the latest security patches.

- Secure coding practices: Following secure coding practices such as input validation, output encoding, error handling, and logging and auditing.
