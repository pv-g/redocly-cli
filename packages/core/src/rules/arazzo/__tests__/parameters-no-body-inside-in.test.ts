import { outdent } from 'outdent';
import { lintDocument } from '../../../lint';
import { parseYamlToDocument, replaceSourceWithRef, makeConfig } from '../../../../__tests__/utils';
import { BaseResolver } from '../../../resolve';
import { StyleguideConfig } from '../../../config';
import { ArazzoRule } from '../../../visitors';

describe('Arazzo parameters-no-body-inside-in', () => {
  const document = parseYamlToDocument(
    outdent`
      arazzo: '1.0.0'
      info:
        title: Cool API
        version: 1.0.0
        description: A cool API
      sourceDescriptions:
        - name: museum-api
          type: openapi
          url: openapi.yaml
      workflows:
        - workflowId: get-museum-hours
          description: This workflow demonstrates how to get the museum opening hours and buy tickets.
          parameters:
            - in: body
              name: Authorization
              value: Basic Og==
          steps:
            - stepId: get-museum-hours
              description: >-
                Get museum hours by resolving request details with getMuseumHours operationId from openapi.yaml description.
              operationId: museum-api.getMuseumHours
              successCriteria:
                - condition: $statusCode == 200
    `,
    'arazzo.yaml'
  );

  it('should not report on `body` inside parameter `in` field', async () => {
    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: await makeConfig({ rules: {} }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`[]`);
  });

  it('should report on `body` inside parameter `in` field', async () => {
    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: await makeConfig({
        rules: {},
        arazzoRules: { 'parameters-no-body-inside-in': 'error' },
      }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`
      [
        {
          "location": [
            {
              "pointer": "#/workflows/0/parameters/0/in",
              "reportOnKey": false,
              "source": "arazzo.yaml",
            },
          ],
          "message": "The \`body\` value of the \`in\` property is not supported by Spot.",
          "ruleId": "parameters-no-body-inside-in",
          "severity": "error",
          "suggest": [],
        },
      ]
    `);
  });
});