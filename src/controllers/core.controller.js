export default class CoreController {
  static datamapper;
  static className;
  static validator;

  static async create(req, res) {
    const data = this.validator.checkBodyForCreate(req.body);

    const row = await this.datamapper.insert(data);
    res.status(200).json(row);
  }

  static async getAll(_, res) {
    const rows = await this.datamapper.findAll();
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