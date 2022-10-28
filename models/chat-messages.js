class Message {
  constructor(id, name, message) {
    this.id = id;
    this.name = name;
    this.message = message;
  }
}

class ChatMessage {
  constructor() {
    this.messages = [];
    this.users = [];
    this.groups = [];
  }

  get last10() {
    this.messages = this.messages.splice(0, 10);
    return this.messages;
  }

  get userArr() {
    return Object.values(this.users);
  }
  sendMessage(id, name, message) {
    this.messages.unshift(new Message(id, name, message));
  }

  addUser(user) {
    user.grupo = null;
    this.users[user._id] = user;
  }

  disconnectUser(id) {
    delete this.users[id];
  }

  addChatGroup(id, group) {
    if (!this.groups[group]) {
      this.groups[group] = [];
    }
    if (!this.groups[group].includes(id)) {
      this.groupsp[group].push(id);
    }
  }
  getUsersInGroup(group) {
    const users = [];
    const groupsIDS = this.groups[group];
    for (let index = 0; index < groupsIDS.length; index++) {
      const user = this.users[groupsIDS[index]];
      users.push(user);
    }
    return users;
  }

  disconnectUserInGroup(id, group) {
    const groupsIDS = this.groups[group];
    const newGroup = groupsIDS.filter((item) => item !== id);
    if (newGroup.length === 0) {
      delete this.groups[group];
    } else {
      this.groups[group] = newGroup;
    }
  }
}

module.exports = ChatMessage;
