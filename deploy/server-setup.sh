#!/usr/bin/env bash
# One-time VPS setup for Ocevia Lab static site.
# Run on the server as a user with sudo. Does NOT modify other apps or nginx sites.
set -euo pipefail

APP_NAME="ocevialab"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
WEB_ROOT="/var/www/${APP_NAME}"
SSH_KEY_COMMENT="github-actions-${APP_NAME}"

echo "==> Creating web root: ${WEB_ROOT}"
sudo mkdir -p "${WEB_ROOT}"
sudo chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${WEB_ROOT}"
sudo chmod 755 "${WEB_ROOT}"

echo "==> Ensuring deploy user exists: ${DEPLOY_USER}"
if ! id "${DEPLOY_USER}" &>/dev/null; then
  sudo adduser --disabled-password --gecos "" "${DEPLOY_USER}"
fi

echo "==> Creating dedicated SSH key for GitHub Actions (if missing)"
sudo mkdir -p "/home/${DEPLOY_USER}/.ssh"
sudo chmod 700 "/home/${DEPLOY_USER}/.ssh"
KEY_PATH="/home/${DEPLOY_USER}/.ssh/${APP_NAME}_deploy"
if [[ ! -f "${KEY_PATH}" ]]; then
  sudo ssh-keygen -t ed25519 -f "${KEY_PATH}" -N "" -C "${SSH_KEY_COMMENT}"
  sudo cat "${KEY_PATH}.pub" | sudo tee -a "/home/${DEPLOY_USER}/.ssh/authorized_keys" > /dev/null
  sudo chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh"
  sudo chmod 600 "/home/${DEPLOY_USER}/.ssh/authorized_keys"
fi

echo ""
echo "=== Setup complete ==="
echo "Web root:     ${WEB_ROOT}"
echo "Deploy user:  ${DEPLOY_USER}"
echo ""
echo "Add this PRIVATE key to GitHub repo secret VPS_SSH_KEY:"
echo "--------------------------------------------------------"
sudo cat "${KEY_PATH}"
echo "--------------------------------------------------------"
echo ""
echo "Next steps:"
echo "  1. Copy deploy/nginx/ocevialab.conf.example to /etc/nginx/sites-available/${APP_NAME}"
echo "  2. Set server_name and root path, enable site, run: sudo nginx -t && sudo systemctl reload nginx"
echo "  3. Add GitHub secrets: VPS_HOST, VPS_USER=${DEPLOY_USER}, VPS_DEPLOY_PATH=${WEB_ROOT}, VPS_SSH_KEY"
echo "  4. Push to main branch to trigger deploy"
