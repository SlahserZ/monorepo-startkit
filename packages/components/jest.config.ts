/*
 * @Author: SlahserZ
 * @Date: 2023-01-05 13:28:18
 * @LastEditors: SlahserZ
 * @LastEditTime: 2023-01-06 16:54:43
 * @FilePath: /monorepo-startkit/packages/components/jest.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "monorepo-startkit/tsconfig.json";

const config: Config.InitialOptions = {
  preset: "ts-jest",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: "<rootDir>/../../",
  }),
};

export default config;
