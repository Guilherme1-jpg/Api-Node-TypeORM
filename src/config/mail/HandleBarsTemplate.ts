import fs from "fs";
import Handlebars from "handlebars";

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseTemplate {
    file: string,
    variables: ITemplateVariable
}

export default class handlebarsTemplate {
    public async parse({ file, variables }: IParseTemplate): Promise<string> {

        const templateFile = await fs.promises.readFile(file, { encoding: 'utf-8' });

        const parseTemplate = Handlebars.compile(templateFile);

        return parseTemplate(variables)
    }
}