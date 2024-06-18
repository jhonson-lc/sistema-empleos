# Sistema Empleos

## Introduction

Sistema Empleos is a web application designed to streamline the job search and recruitment process. It allows job seekers to find and apply for jobs while enabling employers to post job listings and manage applications efficiently.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Features

- Job listing creation and management
- Job search and application
- User authentication and profiles
- Dashboard for employers and job seekers

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jhonson-lc/sistema-empleos.git
   cd sistema-empleos
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables by creating a `.env` file in the root directory with the necessary configurations (refer to `.env.example` for guidance).

4. Run the development server:
   ```bash
   yarn dev
   ```

## Usage

Once the server is running, you can access the application at `http://localhost:3000`. Use the dashboard to manage job listings and applications.

## Dependencies

- TypeScript
- Next.js
- Prisma
- Cypress

## Configuration

Ensure all environment variables are set in your `.env` file. Typical configurations include database connection strings and API keys.

## Troubleshooting

For common issues:

- Check if all dependencies are installed correctly.
- Ensure the database is running and accessible.
- Review logs for specific error messages.

## Contributors

- [Jhonson LC](https://github.com/jhonson-lc)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
