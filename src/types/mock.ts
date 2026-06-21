// Type definitions for mock JSON data.
// src/types/mock.ts
export type Announcement = {
  id: string;
  title: string;
  time: string;
  body: string;
};

export type Evacuee = {
  id: string;
  receptionNumber: string;
  name: string;
  householdSize: number;
  stayLocation: string;
  status: string;
  supportNeeds: string;
  memo: string;
};

export type Schedule = {
  time: string;
  title: string;
  description: string;
};

export type SupportInfo = {
  id: string;
  title: string;
  description: string;
  contact: string;
};

export type CommunityUser = {
  id: string;
  password: string;
  nickname: string;
};

export type CommunityMessage = {
  id: string;
  userId: string;
  nickname: string;
  postedAt: string;
  body: string;
};

export type CommunityBoard = {
  thread: {
    id: string;
    title: string;
    body: string;
    status: string;
  };
  users: CommunityUser[];
  messages: CommunityMessage[];
};
