declare namespace NodeJS {
  /**
   * User environment.
   *
   * @extends {Dict<string>}
   */
  interface ProcessEnv extends Dict<string> {
    /**
     * The path on the GitHub Actions runner to the file that sets variables
     * from workflow commands. The path to this file is unique to the current
     * step and changes for each step in a job.
     *
     * @see https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions#setting-an-environment-variable
     *
     * @example
     *  '/home/runner/work/_temp/_runner_file_commands/set_env_a54c58df-76eb-47eb-b04c-05877cebe05d'
     */
    GITHUB_ENV?: string | undefined

    /**
     * The type of environment the Node.js process is running in.
     */
    NODE_ENV?: 'development' | 'production' | 'test' | undefined
  }
}
