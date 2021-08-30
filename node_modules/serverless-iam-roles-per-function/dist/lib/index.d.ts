interface Statement {
    Effect: 'Allow' | 'Deny';
    Action: string | string[];
    Resource: string | any[];
}
declare class ServerlessIamPerFunctionPlugin {
    hooks: {
        [i: string]: () => void;
    };
    serverless: any;
    awsPackagePlugin: any;
    defaultInherit: boolean;
    readonly PROVIDER_AWS = "aws";
    /**
     *
     * @param {Serverless} serverless - serverless host object
     * @param {Object} _options
     */
    constructor(serverless: any, _options?: any);
    /**
     * Utility function which throws an error. The msg will be formatted with args using util.format.
     * Error message will be prefixed with ${PLUGIN_NAME}: ERROR:
     * @param {string} msg
     * @param {*[]} args
     * @returns void
     */
    throwError(msg: string, ...args: any[]): void;
    /**
     * @param {*} statements
     * @returns void
     */
    validateStatements(statements: any): void;
    /**
     * @param {*[]} nameParts
     * @returns void
     */
    getRoleNameLength(nameParts: any[]): number;
    /**
     * @param {string} functionName
     * @returns {string}
     */
    getFunctionRoleName(functionName: string): any;
    /**
     * @param {string} functionName
     * @param {string} roleName
     * @param {string} globalRoleName
     * @return the function resource name
     */
    updateFunctionResourceRole(functionName: string, roleName: string, globalRoleName: string): string;
    /**
     * Get the necessary statement permissions if there are SQS event sources.
     * @param {*} functionObject
     * @return statement (possibly null)
     */
    getSqsStatement(functionObject: any): Statement | null;
    /**
     * Get the necessary statement permissions if there are stream event sources of dynamo or kinesis.
     * @param {*} functionObject
     * @return array of statements (possibly empty)
     */
    getStreamStatements(functionObject: any): any[];
    /**
     * Will check if function has a definition of iamRoleStatements.
     * If so will create a new Role for the function based on these statements.
     * @param {string} functionName
     * @param {Map} functionToRoleMap - populate the map with a mapping from function resource name to role resource name
     * @returns void
     */
    createRoleForFunction(functionName: string, functionToRoleMap: Map<string, string>): void;
    /**
     * Go over each EventSourceMapping and if it is for a function with a function level iam role
     * then adjust the DependsOn
     * @param {Map} functionToRoleMap
     * @returns void
     */
    setEventSourceMappings(functionToRoleMap: Map<string, string>): void;
    /**
     * @returns void
     */
    createRolesPerFunction(): void;
}
export = ServerlessIamPerFunctionPlugin;
