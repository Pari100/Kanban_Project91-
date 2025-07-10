export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'online' | 'away' | 'offline';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignees: User[];
  labels: Label[];
  dueDate?: Date;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  comments: Comment[];
  attachments: Attachment[];
  checklist: ChecklistItem[];
  estimatedHours?: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  boardId: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  mentions: string[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video' | 'other';
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: User;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  limit?: number;
  position: number;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
  members: User[];
  labels: Label[];
  background: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  boards: Board[];
  members: User[];
  settings: WorkspaceSettings;
  createdAt: Date;
}

export interface WorkspaceSettings {
  allowGuestAccess: boolean;
  defaultBoardVisibility: 'private' | 'workspace' | 'public';
  integrations: Integration[];
}

export interface Integration {
  id: string;
  name: string;
  type: 'slack' | 'github' | 'jira' | 'calendar';
  enabled: boolean;
  config: Record<string, any>;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_moved' | 'task_assigned' | 'comment_added' | 'due_date_changed';
  description: string;
  user: User;
  taskId?: string;
  boardId: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'assignment' | 'due_date' | 'mention' | 'board_invite';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}