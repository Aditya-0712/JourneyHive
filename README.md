# JourneyHive

JourneyHive is a comprehensive travel ticketing platform designed to make exploring, booking, and managing trips seamless and efficient. Built with modern technologies, JourneyHive offers a user-friendly interface and powerful backend capabilities to ensure a smooth user experience.

## Features

### Ticket Management
- **Explore**: Discover destinations, available travel classes, and schedules.
- **Book**: Reserve tickets for specific destinations, travel classes, and dates.
- **Search**: Find tickets based on destination, class, or date.
- **Cancel**: Cancel tickets with ease.

### User Dashboard
- **View History**: Check past bookings and travel history.
- **Track Status**: Monitor the status of booked tickets.

## Technologies Used

### Frontend
- **React.js**: For building a dynamic and responsive user interface.

### Backend
- **Java Spring Boot**: Provides a robust and scalable backend framework.
- **Spring Security**: Ensures secure access and protects user data.
- **JWT**: JSON Web Tokens for secure authentication and session management.
- **OAuth2**: Enables third-party sign-ins with Google and GitHub.

### Database
- **PostgreSQL**: Used for storing ticket, user, and booking data securely.
- **Spring JPA**: Simplifies data persistence and repository management.

### Authentication and Password Management
- **BCrypt Password Encoder**: Securely hashes and verifies user passwords.

## Deployment
- **Frontend**: Hosted on [Vercel](https://vercel.com).
- **Backend**: Deployed on [Render](https://render.com/) and AWS Free Tier (Elastic Beanstalk).
- **Database**: Managed using AWS RDS for high availability and reliability.

## Additional Features
- **Route Maps**: Display routes or journey maps for booked tickets.

## How to Run Locally

### Prerequisites
- Node.js and npm installed
- Java Development Kit (JDK) 17 or later
- PostgreSQL database

### Steps

#### Frontend
1. Navigate to the `client` folder.
2. Install dependencies:
   ```bash
   npm install
3. Configure .env file using .env.example
4. Start client:
   ```bash
   npm start

### Backend
1. Navigate to the `server` folder.
2. Add and configure `application.properties` file in `resources` folder:
   ```application.properties
    server.port=<port_number>
    
    spring.datasource.url=<database_url>
    spring.datasource.username=<database_username>
    spring.datasource.password=<database_password>

3. Start the application:
   ```bash
   ./mvnw spring-boot:run

## Future Enhancements
- **Real-time notifications**: Notify users about ticket updates in real time.
- **Third-party API integration**: Connect with additional travel APIs for more options.
- **AI-based recommendations**: Provide personalized destination suggestions.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve JourneyHive.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For inquiries or support, please contact **Aditya Batgeri** at [adityabatgeri@gmail.com](mailto:adityabatgeri@gmail.com).
