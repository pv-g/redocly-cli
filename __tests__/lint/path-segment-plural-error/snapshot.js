// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint path-segment-plural-error 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:10:3 at #/paths/~1pet

path segment \`pet\` should be plural.

 8 |
 9 | paths:
10 |   '/pet':
   |   ^^^^^^
11 |     get:
12 |       summary: example pet

Error was generated by the path-segment-plural rule.


[2] openapi.yaml:17:3 at #/paths/~1v1~1pets

path segment \`v1\` should be plural.

15 |       '200':
16 |         description: pet example
17 | /v1/pets:
   | ^^^^^^^^
18 |   parameters:
19 |     - name: Accept-Language

Error was generated by the path-segment-plural rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 2 errors.
run \`openapi lint --generate-ignore-file\` to add all problems to the ignore file.


`;