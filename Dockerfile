FROM node

USER node

# Setup SSH access
RUN mkdir ~/.ssh
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
COPY --chown=node id_rsa /home/node/.ssh/
RUN chmod 400 /home/node/.ssh/id_rsa
RUN \
  eval "$(ssh-agent -s)" \
  ssh-add ~/.ssh/id_rsa

# Setup git
RUN git config --global user.name "Reha Burak Acar"
RUN git config --global user.email "rehaburakacar@gmail.com"
RUN git config --global pull.rebase true
# Clone the repo
RUN git clone git@github.com:softeria-test/grid-view-burak.git /home/node/grid-view-burak
