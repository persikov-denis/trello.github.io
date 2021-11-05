export class Card {
  title = "";
  isActive = false;
  filteredBySearch = false;
  filteredByUsers = false;
  filteredByTags = false;
  tagIds = [];
  userIds = [];
  id = 0;
  columnId = 0;

  constructor({ title, tagIds, userIds, columnId }) {
    this.title = title;
    this.tagIds = tagIds || [];
    this.userIds = userIds || [];
    this.columnId = columnId;
    this.id = Math.floor(Date.now() * Math.random());
  }
}
