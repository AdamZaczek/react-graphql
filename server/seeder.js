/* eslint-disable no-console, no-shadow */

import chalk from 'chalk';
import STORY from './appData/mongooseModels/story';
import COMMENT from './appData/mongooseModels/comment';
import USER from './appData/mongooseModels/user';


const users = [
  {
    _id: '58961460734d1d3956c46fb7',
    name: 'AdamZaczek',
    email: 'adamzaczekul@gmail.com',
    isAdmin: 'true',
    password: '1234',
    age: '25',
    stories: [
      '58951027734d1d3956c4289a',
      '5895106c734d1d3956c428bc'
    ],
    comments: [],
    storyLikes: [],
    storyDislikes: [],
    commentLikes: [],
    commentDislikes: []
  },
  {
    _id: '58961492734d1d3956c46fd0',
    name: 'Avenir',
    email: 'krzak4ever@gmail.com',
    isAdmin: 'false',
    password: '1234',
    age: '25',
    stories: [],
    comments: [
      '589e3d8e734d1d56393c5850',
      '589e3dae734d1d56393c5854'
    ],
    storyLikes: [],
    storyDislikes: [],
    commentLikes: [],
    commentDislikes: []
  }
];

const comments = [
  {
    _id: '589e3d8e734d1d56393c5850',
    _author: '58961492734d1d3956c46fd0',
    _story: '58951027734d1d3956c4289a',
    likes: [],
    dislikes: [],
    createdAt: '2017-02-03T13:31:07+01:00',
    content: 'Amazing. I never thought I could outspeed hungry hamster.'
  },
  {
    _id: '589e3dae734d1d56393c5854',
    _author: '58961492734d1d3956c46fd0',
    _story: '58951027734d1d3956c4289a',
    category: 'scary',
    likes: [],
    dislikes: [],
    createdAt: '2017-02-03T15:24:05+01:00',
    content: 'I find disturbing that most of my life I didn\'t realize how little food it takes to satisfy a regular person or, a hamster.'
  }
];

const stories = [
  {
    _id: '58951027734d1d3956c4289a',
    _author: '58961460734d1d3956c46fb7',
    title: 'Long time ago in a galaxy far away...',
    category: 'adult life',
    likes: [],
    dislikes: [],
    comments: [
      '589e3d8e734d1d56393c5850',
      '589e3dae734d1d56393c5854'
    ],
    createdAt: '2017-02-04T19:31:07+01:00',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla odio dui, ultrices eget dapibus sed, bibendum congue diam. Nulla ac massa a nibh vulputate consectetur vitae nec purus. Donec mollis, erat vel fringilla mollis, ex ex fringilla quam, vel elementum ipsum risus in arcu. Maecenas ornare magna id ante pharetra, quis tempus ligula lobortis. Aliquam tellus mauris, semper id semper eu, iaculis eu velit. Donec tincidunt blandit elit, in feugiat est ornare a. Sed euismod dignissim mauris eget pulvinar. Donec vehicula maximus posuere. Morbi a consequat metus. Aenean efficitur, risus at rutrum tincidunt, diam lacus suscipit turpis, nec consequat mauris dui a ipsum.'
  },
  {
    _id: '5895106c734d1d3956c428bc',
    _author: '58961492734d1d3956c46fd0',
    title: 'Once upon a time...',
    category: 'scary',
    likes: [],
    dislikes: [],
    comments: [],
    createdAt: '2017-02-04T18:24:05+01:00',
    content: 'Etiam congue velit pharetra nisl accumsan, non venenatis dui elementum. Nulla facilisi. Mauris dictum elit lorem, sed rutrum nisi varius at. Aenean nec lorem lacus. Vestibulum ultrices luctus neque, id pretium quam ornare vitae. Aenean luctus neque at nibh tristique congue. Pellentesque ac justo auctor, mattis lacus in, euismod massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut euismod suscipit nisi, sed ullamcorper eros placerat at. Sed et augue viverra erat volutpat dictum eu eu dolor. Curabitur ultricies lorem eu sem semper, id consequat enim blandit. Maecenas vehicula a sapien porttitor sollicitudin. Sed congue tempor nisi non maximus.'
  },
  {
    _id: '58951027734d1d3956c42bbb',
    _author: '58961492734d1d3956c46fd0',
    title: 'Long time ago in a galaxy far away...',
    category: 'funny',
    likes: [],
    dislikes: [],
    comments: [],
    createdAt: '2017-01-03T12:45:07+01:00',
    content: 'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.'
  },
  {
    _id: '58951027734d1d3956c42eee',
    _author: '58961492734d1d3956c46fd0',
    title: 'Force is strong with you Adam',
    category: 'adult life',
    likes: [],
    dislikes: [],
    comments: [],
    content: 'Now is has to work.',
    createdAt: '2017-01-03T12:45:07+01:00'
  }
];


const seedUsers = () => users.map(singleUser => (new USER(singleUser)).save((err, savedUser) => { if (err) return err; return console.log(chalk.blue(`Story with id: ${savedUser.id} seeded`)); }));
const seedComments = () => comments.map(singleComment => (new COMMENT(singleComment)).save((err, savedComment) => { if (err) return err; return console.log(chalk.blue(`Story with id: ${savedComment.id} seeded`)); }));
const seedStories = () => stories.map(singleStory => (new STORY(singleStory)).save((err, savedStory) => { if (err) return err; return console.log(chalk.blue(`Story with id: ${savedStory.id} seeded`)); }));

const seeder = () => {
  seedUsers();
  seedComments();
  seedStories();
};

export default seeder;
