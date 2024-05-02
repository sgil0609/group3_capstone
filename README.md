Getting started with this application:

Fork and Clone the repository.

The following below is assumed that you have npm on your machine.  If you do not, please do the following:

After you have opened the folder in your IDE of choice, we will set it up.  First, we must verify that we have Node.js and a PostgreSQL installed on our machine.  If you do not, following the instructions for [Node.js](https://nodejs.org/en/) and for [PostresSQL](https://www.postgresql.org/).  Now we will get Prisma installed using [Prisma](https://www.prisma.io/docs/getting-started)

As a first step, create a project directory and navigate into it:
```bash
cd capstone
```
Next, initialize a Node.js project and add the Prisma CLI as a development dependency to it:

```bash
npm init -y
npm install prisma --save-dev
```

You can now invoke the Prisma CLI by prefixing it with npx:
```bash
npx prisma
```

Next, set up your Prisma ORM project by creating your Prisma schema file with the following command:
```bash
npx prisma init
```
This command does two things:
Creates a new directory called prisma that contains a file called schema.prisma, which contains the Prisma schema with your database connection variable and schema models.
Creates the .env file in the root directory of the project, which is used for defining environment variables (such as your database connection)

To connect your database, you need to set the url field of the datasource block in your Prisma schema to your database connection URL.  We will then pu
```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
In this case, the url is set via an environment variable which is defined in .env.  Below is an example that will be in your .env file with your information:

```bash
DATABASE_URL="postgresql://user_name:randompassword@localhost:5432/capstone"
```
You now need to adjust the connection URL to point to your own database.

The format of the connection URL for your database depends on the database you use. For PostgreSQL, it looks as follows (the parts spelled all-uppercased are placeholders for your specific connection details):

postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

Here's a short explanation of each component:

USER: The name of your database user
PASSWORD: The password for your database user
HOST: The name of your host name (for the local environment, it is localhost)
PORT: The port where your database server is running (typically 5432 for PostgreSQL)
DATABASE: The name of the database
SCHEMA: The name of the schema inside the database

If you're unsure what to provide for the schema parameter for a PostgreSQL connection URL, you can probably omit it. In that case, the default schema name public will be used.

```bash
DATABASE_URL="postgresql://janedoe:janedoe@localhost:5432/capstone"
```
Since the database is already made for you, you can run the following command:
```bash
npx prisma migrate dev --name init
```
To get started with Prisma Client, you need to install the @prisma/client package:
```bash
npm install @prisma/client
```
Now that the database is made (you can verify by checking inside of your PostgreSQL database), we will run:
```bash
npm run seed
```
You will see in your conosole log that the database has been seeded successfully!

Now we will install the remaining packages requires to use this software

```bash
npm install -dev prisma
npm install @prisma/client bcrypt jsonwebtoken uuid
```

In your`.env` file, we will add your secret value for auth
```
JWT_SECRET='somesecretvalue'
```
Update `src/server/db/client.js` to reflect the name of your database

```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```
Start the server
```bash
npm run dev
```

Add the following to you `.env` file.  You can use port 3000 as demonstrated below:
```bash
PORT = '3000'
```

Verify it is woking by opening your browser at `http://localhost:3000`

