/*
 * @Author: SlahserZ
 * @Date: 2023-01-06 14:54:38
 * @LastEditors: SlahserZ Renli.Zou@lotuscars.com.cn
 * @LastEditTime: 2023-01-06 17:02:35
 * @FilePath: /monorepo-startkit/packages/components/test/button.spec.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { Button } from "../src/index";

it("trigger event", () => {
  const component = renderer.create(
    <Button onClick={() => 1} danger={false} />
  );
  let tree = component.toJSON() as ReactTestRendererJSON;

  renderer.act(() => {
    tree.props.onClick();
  });

  // re-rendering
  tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree).toMatchSnapshot();
});
