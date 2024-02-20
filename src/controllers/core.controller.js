import urlQueryJsonParser from "url-query-json-parser";

export default class CoreController {
  static datamapper;
  static className;
  static validator;

  static async create(req, res) {
    const data = this.validator.checkBodyForCreate(req.body);
    const row = await this.datamapper.create(data);
    res.status(201).json(row);
  }

  static async getAll(req, res) {
    const queryString = req.url.split("?")[1];
    const query = this.validator.checkQueryForGet(urlQueryJsonParser.parseQuery(queryString));

    const rows = await this.datamapper.findAll(query);
    res.status(200).json(rows);
  }

  static async getByPk(req, res) {
    const { id } = req.params;
    this.validator.checkId(id);

    const row = await this.datamapper.findByPk(id);
    this.validator.checkIfExist(row);

    return res.status(200).json(row);
  }

  static async update(req, res) {
    const { id } = req.params;
    this.validator.checkId(id);
    const data = this.validator.checkBodyForUpdate(req.body);

    const exitedRow = await this.datamapper.findByPk(id);
    this.validator.checkIfExist(exitedRow);

    const row = await this.datamapper.update({...data, id});

    return res.status(200).json(row);
  }

  static async delete(req, res) {
    const { id } = req.params;
    this.validator.checkId(id);

    const exitedRow = await this.datamapper.findByPk(id);
    this.validator.checkIfExist(exitedRow);

    await this.datamapper.delete(id);

    return res.status(204).end();
  }
}