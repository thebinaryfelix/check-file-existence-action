
[//]: # (s-1.0.1)

# [1.0.1] - (2025-09-15)

## Bugfixes
* src/utils/setFinalOutput/setFinalOutput.ts
line 8:
    failExecution(message)
To:
    logInfo(message)

src/utils/setFinalOutput/setFinalOutput.test.ts
lines 15 to 27:
  test(&#x27;calls core actions with correct arguments if has missing files&#x27;, () &#x3D;&gt; {
    const missingFileName &#x3D; &#x27;missing_file_1&#x27;

    setFinalOutput([missingFileName])

    expect(failExecution).toHaveBeenCalledWith(
      expect.stringContaining(missingFileName),
    )

    expect(setOutput).toHaveBeenCalledWith(&#x27;false&#x27;)

    expect(logInfo).not.toHaveBeenCalled()
  })
To:
  test(&#x27;calls core actions with correct arguments if has missing files&#x27;, () &#x3D;&gt; {
    const missingFileName &#x3D; &#x27;missing_file_1&#x27;

    setFinalOutput([missingFileName])

    expect(logInfo).toHaveBeenCalledWith(
      expect.stringContaining(&#x27;Missing files:&#x27;),
    )

    expect(setOutput).toHaveBeenCalledWith(&#x27;false&#x27;)

    expect(failExecution).not.toHaveBeenCalled()
  })

package.json
Bumped the following Dependencies to resolve vulnerabilities:
    &quot;@release-it/bumper&quot;: &quot;^7.0.5&quot;,
    &quot;news-fragments&quot;: &quot;^4.0.0&quot;,


[//]: # (e-1.0.1)


[//]: # (s-1.0.0)

# [1.0.0] - (2022-10-23)

[//]: # (e-1.0.0)

