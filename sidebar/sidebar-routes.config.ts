export const ROUTES = [
  { path: '/dashboard', title: 'Home', icon: 'home', children: null },
 
  {
    path: '#member-list',id: 'member-list' ,title: 'Members', icon: 'group', children: [
      { path: 'members', title: 'List of Members' },
      { path: 'members/publications', title: 'publication Management' },
      { path: 'members/tools', title: 'tool Management' },
      { path: 'members/events', title: 'Event Management' },

    ],
  },
    { path: 'publications', title: 'Publication', icon: 'bookmarks', children: null },
  { path: 'tools', title: 'Tools', icon: 'notifications', children: null },
  { path: 'events', title: 'Events', icon: 'event', children: null },




];
