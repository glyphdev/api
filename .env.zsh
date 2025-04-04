# ENVIRONMENT VARIABLES - ZSH
#
# References:
#
# - https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/dotenv
# - https://homebrew-file.readthedocs.io/en/latest/usage.html

[ -f $PWD/.env.repo ] && source $PWD/.env.repo

HOMEBREW_BREWFILE=./Brewfile
NEST_DEBUG=1
NODE_NO_WARNINGS=1
NODE_OPTIONS='--experimental-strip-types --experimental-transform-types'
