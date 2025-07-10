import { Board, Task, User, Workspace, Activity, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    email: 'alex@company.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
    role: 'admin',
    status: 'online',
  },
  {
    id: '2',
    name: 'Maya Chen',
    email: 'maya@company.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
    role: 'member',
    status: 'online',
  },
  {
    id: '3',
    name: 'Jordan Kim',
    email: 'jordan@company.com',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
    role: 'member',
    status: 'away',
  },
  {
    id: '4',
    name: 'Sam Taylor',
    email: 'sam@company.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
    role: 'member',
    status: 'offline',
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design new user onboarding flow',
    description: 'Create wireframes and prototypes for the new user registration and onboarding experience',
    assignees: [mockUsers[1]],
    labels: [
      { id: '1', name: 'Design', color: 'bg-purple-100 text-purple-800 border-purple-200', boardId: '1' },
      { id: '2', name: 'High Priority', color: 'bg-red-100 text-red-800 border-red-200', boardId: '1' }
    ],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    priority: 'high',
    status: 'todo',
    comments: [],
    attachments: [],
    checklist: [
      { id: '1', text: 'Research competitor flows', completed: true },
      { id: '2', text: 'Create user personas', completed: false },
      { id: '3', text: 'Design wireframes', completed: false }
    ],
    estimatedHours: 16,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Implement real-time notifications',
    description: 'Add WebSocket support for live updates and push notifications',
    assignees: [mockUsers[0], mockUsers[2]],
    labels: [
      { id: '3', name: 'Backend', color: 'bg-blue-100 text-blue-800 border-blue-200', boardId: '1' },
      { id: '4', name: 'Feature', color: 'bg-green-100 text-green-800 border-green-200', boardId: '1' }
    ],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    status: 'in-progress',
    comments: [],
    attachments: [],
    checklist: [
      { id: '4', text: 'Set up WebSocket server', completed: true },
      { id: '5', text: 'Implement client-side handlers', completed: false }
    ],
    estimatedHours: 24,
    actualHours: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '1',
  },
  {
    id: '3',
    title: 'Mobile app performance optimization',
    description: 'Optimize React Native app for better performance on low-end devices',
    assignees: [mockUsers[3]],
    labels: [
      { id: '5', name: 'Mobile', color: 'bg-orange-100 text-orange-800 border-orange-200', boardId: '1' },
      { id: '6', name: 'Performance', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', boardId: '1' }
    ],
    priority: 'urgent',
    status: 'review',
    comments: [],
    attachments: [],
    checklist: [],
    estimatedHours: 12,
    actualHours: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '2',
  },
  {
    id: '4',
    title: 'User authentication system',
    description: 'Complete Firebase authentication integration with social login options',
    assignees: [mockUsers[0]],
    labels: [
      { id: '7', name: 'Auth', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', boardId: '1' }
    ],
    priority: 'low',
    status: 'done',
    comments: [],
    attachments: [],
    checklist: [
      { id: '6', text: 'Email/password login', completed: true },
      { id: '7', text: 'Google OAuth', completed: true },
      { id: '8', text: 'GitHub OAuth', completed: true }
    ],
    estimatedHours: 20,
    actualHours: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '1',
  },
];

export const mockBoard: Board = {
  id: '1',
  title: 'Product Development Sprint',
  description: 'Q4 2024 product development and feature releases',
  members: mockUsers,
  labels: [
    { id: '1', name: 'Design', color: 'bg-purple-100 text-purple-800 border-purple-200', boardId: '1' },
    { id: '2', name: 'High Priority', color: 'bg-red-100 text-red-800 border-red-200', boardId: '1' },
    { id: '3', name: 'Backend', color: 'bg-blue-100 text-blue-800 border-blue-200', boardId: '1' },
    { id: '4', name: 'Feature', color: 'bg-green-100 text-green-800 border-green-200', boardId: '1' },
    { id: '5', name: 'Mobile', color: 'bg-orange-100 text-orange-800 border-orange-200', boardId: '1' },
    { id: '6', name: 'Performance', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', boardId: '1' },
    { id: '7', name: 'Auth', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', boardId: '1' },
  ],
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  isPrivate: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: '1',
  columns: [
    {
      id: 'todo',
      title: 'Backlog',
      color: 'bg-slate-50 border-slate-200',
      position: 0,
      limit: 10,
      tasks: [mockTasks[0]],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-50 border-blue-200',
      position: 1,
      limit: 5,
      tasks: [mockTasks[1]],
    },
    {
      id: 'review',
      title: 'Code Review',
      color: 'bg-amber-50 border-amber-200',
      position: 2,
      limit: 3,
      tasks: [mockTasks[2]],
    },
    {
      id: 'done',
      title: 'Completed',
      color: 'bg-emerald-50 border-emerald-200',
      position: 3,
      tasks: [mockTasks[3]],
    },
  ],
};

export const mockWorkspace: Workspace = {
  id: '1',
  name: 'TechCorp Development',
  description: 'Main workspace for product development team',
  boards: [mockBoard],
  members: mockUsers,
  settings: {
    allowGuestAccess: false,
    defaultBoardVisibility: 'workspace',
    integrations: [
      { id: '1', name: 'Slack', type: 'slack', enabled: true, config: {} },
      { id: '2', name: 'GitHub', type: 'github', enabled: false, config: {} },
    ],
  },
  createdAt: new Date(),
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task_created',
    description: 'created a new task "Design new user onboarding flow"',
    user: mockUsers[0],
    taskId: '1',
    boardId: '1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'task_moved',
    description: 'moved "Implement real-time notifications" to In Progress',
    user: mockUsers[2],
    taskId: '2',
    boardId: '1',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'task_assigned',
    description: 'assigned "Mobile app performance optimization" to Sam Taylor',
    user: mockUsers[1],
    taskId: '3',
    boardId: '1',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'assignment',
    title: 'New Task Assignment',
    message: 'You have been assigned to "Design new user onboarding flow"',
    read: false,
    actionUrl: '/board/1/task/1',
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: '2',
    type: 'due_date',
    title: 'Due Date Reminder',
    message: '"Implement real-time notifications" is due in 2 days',
    read: false,
    actionUrl: '/board/1/task/2',
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: '3',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Alex Rivera mentioned you in a comment',
    read: true,
    actionUrl: '/board/1/task/1',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
];