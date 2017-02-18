module.exports = {
  /**
    * Environments.
    * @var
    * @param environment {string} - The environment type
    * Environment list :
    * - development
    * - staging
    * - production
    */
  environment: 'production',
  port: 3000,

  /**
    * Database Configuration.
    * @var
    * @param databaseHost {string} - Your Database Host
    * @param databaseUsername {string} - Your Database Username
    * @param databasePassword {string} - Your Database Password
    * @param databaseName {string} - Your Database Name
    */

  dbPrefix          : 'sora_',
  databaseHost      : 'localhost',
  databaseUsername  : 'root',
  databasePassword  : 'labs-zdumb',
  databaseName      : 'sorairo_fansub'

}
