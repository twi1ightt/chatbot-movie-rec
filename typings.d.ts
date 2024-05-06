interface Message {
  text: string;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

interface emotionDetection {
  text: string;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

interface Movie {
  title: string;
  genres: string;
  description: string;
  type: string;
}

