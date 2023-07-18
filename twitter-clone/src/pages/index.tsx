import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Client, Databases, Account } from 'appwrite';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ tweets }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const client = new Client();
    const account = new Account(client);
    client
      .setEndpoint('http://localhost/v1')
      .setProject('64b6561ae1fc5e249f84');

    const promise = account.get();
    promise.then(
      function (response) {
        console.log(response);
        setUser(response.email);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  const createUser = async () => {
    const client = new Client();
    const account = new Account(client);

    client
      .setEndpoint('http://localhost/v1')
      .setProject('64b6561ae1fc5e249f84');

    const response = account.create('onurkorkmaz', 'honourkorkmaz@gmail.com', 'Azr2010q+');

    response.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const userLogin = async () => {
    const client = new Client();
    const account = new Account(client);

    client
      .setEndpoint('http://localhost/v1')
      .setProject('64b6561ae1fc5e249f84');

    const response = account.createEmailSession('honourkorkmaz@gmail.com', 'Azr2010q+');

    response.then(
      function (response) {
        console.log(response);
        setUser(response.userId + ' ' + response.$id);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const logoutSessions = async () => {
    const client = new Client();
    const account = new Account(client);

    client
      .setEndpoint('http://localhost/v1')
      .setProject('64b6561ae1fc5e249f84');

    const response = account.deleteSessions();

    response.then(
      function (response) {
        console.log(response);
        setUser('');
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const createTweet = async () => {
    const client = new Client();
    const databases = new Databases(client);

    client
      .setEndpoint('http://localhost/v1')
      .setProject('64b6561ae1fc5e249f84');

    const response = databases.createDocument('64b6588607ed06d7d223','64b658954384058d2432','uniqueID',{
      text:"Hello World"
    });

    response.then(
      function (response) {
        console.log(response);
        setUser('');
      },
      function (error) {
        console.log(error);
      }
    );
  };

  console.log(tweets);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div>
        <button onClick={createUser}>Create a user</button>
      </div>
      <div>
        <button onClick={userLogin}>Login User</button>
        {user && <div>Hello {user}</div>}
        <br />
        <button onClick={createTweet}>Create Tweet</button>

        <button onClick={logoutSessions}>Logout</button>

        <div>
          <h2>Tweets</h2>
          {tweets.documents.map((tweet) => (
            <div key={tweet.id}>
              <h3>{tweet.text}</h3>
              <p>{tweet.createAt}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Rest of the component code */}
    </main>
  );
}

export async function getServerSideProps(context) {
  console.log('Endpoint:', 'http://localhost/v1');
  console.log('Project:', '64b6561ae1fc5e249f84');
  console.log('Database:', '64b6588607ed06d7d223');
  console.log('Collection:', '64b658954384058d2432');

  try {
    const client = new Client();
    client.setEndpoint('http://localhost/v1');
    client.setProject('64b6561ae1fc5e249f84');

    const databases = new Databases(client);

    const tweets = await databases.listDocuments('64b6588607ed06d7d223', '64b658954384058d2432');

    console.log('Tweets:', tweets);

    return {
      props: { tweets },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      props: { tweets: [] },
    };
  }
}
