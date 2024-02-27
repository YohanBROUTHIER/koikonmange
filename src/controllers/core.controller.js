export default class CoreController {
  static datamapper;
  static className;
  static validator;
  
  static async create(req, res) {
    const data = this.validator.checkBodyForCreate(req.body,req.user);
    const row = await this.datamapper.create(data);
    res.status(201).json(row);
  }
  
  static async getAll(req, res) {
    const user = req.user ? req.user : null;
    const query = this.validator.checkQueryForGet(req.query);
    const rows = await this.datamapper.findAll(query,user);
    res.status(200).json(rows);
  }

  static async getByPk(req, res) {
    const { id } = req.params;
    this.validator.checkId(id);

    const row = await this.datamapper.findByPk(id);
    this.validator.checkIfExist(row, this.className);

    return res.status(200).json(row);
  }

  static async update(req, res) {
    const { id } = req.params;
    this.validator.checkId(id);
    const data = this.validator.checkBodyForUpdate(req.body);

    const exitedRow = await this.datamapper.findByPk(id);
    this.validator.checkIfExist(exitedRow, this.className);

    const row = await this.datamapper.update({...data, id});

    return res.status(200).json(row);
  }

  static async delete(req, res) {
    const { id } = req.params;
    this.validator.checkId(id);

    const exitedRow = await this.datamapper.findByPk(id);
    this.validator.checkIfExist(exitedRow, this.className);

    await this.datamapper.delete(id);

    return res.status(204).end();
  }
}