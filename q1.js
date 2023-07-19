const pick = require("lodash/pick");
const map = require("lodash/map");
const axios = require("axios");
const sortBy = require("lodash/sortBy");

// @TODO: This is the model/class you should work out
class User {
  constructor({ id }) {
    this.id = id;
  }

  select(tableName) {
    this.tableName = tableName;

    return this;
  }

  attributes(attributes) {
    this.selectedAttibutes = attributes;

    return this;
  }

  filterByAttributes(selectedAttibutes, records) {
    if (!selectedAttibutes?.length) return records;

    return map(records, (record) => pick(record, selectedAttibutes));
  }

  where(conditions) {
    this.whereConditions = conditions;
    return this;
  }

  order(sortingColumns) {
    this.orderColumns = sortingColumns;
    return this;
  }

  getQueryParams() {
    let params = {};
    if (Object.keys(this.whereConditions).length) {
      Object.keys(this.whereConditions).forEach((key) => {
        params = { ...params, [key]: this.whereConditions[key] };
      });
    }

    if (this.orderColumns?.length) {
      params = { ...params, _sort: this.orderColumns.join(",") };
    }

    return params;
  }

  reset() {
    this.records = [];
    this.tableName = null;
  }

  async findAll() {
    const tableName = this.tableName;
    const attributes = this.selectedAttibutes;
    try {
      const params = this.getQueryParams();

      this.reset();

      const response = await axios.get(
        `http://localhost:3000/${tableName}`,
        { params }
      );
      const data = response.data;

      const filteredRecord = this.filterByAttributes(attributes, data);

      return filteredRecord;
    } catch (error) {
      console.log("Error while fetching records", tableName, error);
      throw error;
    }
  }

  async findOne() {
    const tableName = this.tableName;
    const attributes = this.selectedAttibutes;

    try {
      const params = this.getQueryParams();

      this.reset();
      const response = await axios.get(
        `http://localhost:3000/${tableName}`,
        { params }
      );
      const data = response.data;

      const filteredRecord = this.filterByAttributes(attributes, data);

      return filteredRecord.find((record) => record);
    } catch (error) {
      console.log("Error while fetching records", tableName, error);
      throw error;
    }
  }
}

// ------------------------------------------
// You shouldn't need to edit below this line

var user = new User({
  id: 123,
});

// Mimic what a ORM-like query engine would do by filtering the
// "sampleData" based on the query and the expected result example.
// Hint: lodash can be quite handly in dealing with this.

user
  .select("apps")
  .attributes(["id", "title"])
  .where({ published: true })
  .order(["title"])
  .findAll()
  .then(function (apps) {
    // The expected result is for the "apps" array is:
    // [ { id: 6, title: 'Et' }, { id: 1, title: 'Lorem' } ]
    console.log(apps);
  });

user
  .select("organizations")
  .attributes(["name"])
  .where({ suspended: false })
  .findOne()
  .then(function (organization) {
    // The expected result is for the "organization" object is:
    // { id: 3, name: 'Fliplet' }
    console.log(organization);
  });
