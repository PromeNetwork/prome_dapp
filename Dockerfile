FROM node:20-alpine3.18

# RUN apk add --no-cache libc6-compat git
# RUN apk add --update --no-cache python3 make g++  py3-pip&& ln -sf python3


# Setup pnpm environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@latest --activate


COPY package.json pnpm-lock.yaml ./
# RUN pnpm install -g node-gyp  node-sass --unsafe-perm=true 
# RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile


RUN corepack enable
RUN corepack prepare pnpm@latest --activate

ENV NODE_ENV production

COPY . .
# RUN pnpm build


### Production image runner ###
# FROM base AS runner

# Set NODE_ENV to production


# Disable Next.js telemetry
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Set correct permissions for nextjs user and don't run as root
RUN addgroup nodejs
RUN adduser -SDH nextjs
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

# Exposed port (for orchestrators and dynamic reverse proxies)
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "wget", "-q0", "http://localhost:3000/health" ]

# Run the nextjs app
CMD ["node", ".next/standalone/server.js"]