#!/bin/bash

export application_name="cloudmix"
export application_port="3000"
export postgres_username="postgres"
export postgres_password="CHOOSE A SECURE DB PASSWORD"
export safeuser_username="safeuser"
export safeuser_password="CHOOSE A SECURE USER PASSWORD"
export source_dir="/vagrant"


echo "Provisioning virtual machine..."
sudo apt-get update -y > /dev/null

# --------------------------------------------------
# Create a safe user with a home director
# --------------------------------------------------
echo "Add safe user"
useradd -s /bin/bash -m -d /home/${safeuser_username} -c "safe user" ${safeuser_username}
echo "${safeuser_username}:${safeuser_password}" | chpasswd # give the user the specified password
usermod -aG sudo ${safeuser_username} # Add safe user to the sudo group


# --------------------------------------------------
# Git and Curl
# --------------------------------------------------
echo "Installing Git and Curl"
sudo apt-get install git curl -y > /dev/null

echo "Installing app specific libs"
sudo apt-get install redis-server make g++ libtag1-dev libav-tools -y > /dev/null

# --------------------------------------------------
# Install Nginx
# --------------------------------------------------
echo "Installing Nginx"
sudo apt-get install nginx -y > /dev/null


# --------------------------------------------------
# Node
# --------------------------------------------------
echo "Installing Node"
# Add the official node repo
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - > /dev/null
sudo apt-get install nodejs -y > /dev/null

# Dependent global npm installs
echo "Installing global NPM packages"
sudo npm install -g pm2 nodemon gulp browserify

# Npm install
echo "Installing local NPM packages"
cd ${source_dir} && npm install


# --------------------------------------------------
# Install Postgres 9.3
# --------------------------------------------------
echo "Installing Postgres"
# Set locale so postgres will use utf-8
sudo update-locale LANG="en_US.UTF-8"
sudo update-locale LANGUAGE="en_US.UTF-8"
sudo update-locale LC_ALL="en_US.UTF-8"

# Add the official postgres repo
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - > /dev/null
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" \
	>> /etc/apt/sources.list.d/postgresql.list'
sudo apt-get update -y > /dev/null

# Get the packages
sudo apt-get install postgresql-9.3 libpq-dev postgresql-server-dev-9.3 -y > /dev/null

# Postgres Configuration
echo "Configuring Postgres"
# Set the password to the config value
sudo -u postgres psql -U postgres -d postgres -c "ALTER USER ${postgres_username} WITH PASSWORD '${postgres_password}';" > /dev/null

# All access the postgresql DB from remote sources
sudo sed -i "s/127.0.0.1\\/32/0.0.0.0\\/0/g" /etc/postgresql/9.3/main/pg_hba.conf
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/9.3/main/postgresql.conf

# Restart after changes
sudo service postgresql restart > /dev/null


# --------------------------------------------------
# Nginx Configuration
# --------------------------------------------------
echo "Configuring Nginx"
sudo cp ${source_dir}/provision/${application_name}.conf /etc/nginx/sites-available/${application_name}.conf > /dev/null
perl -p -i -e 's/\$\{([^}]+)\}/defined $ENV{$1} ? $ENV{$1} : $&/eg' < /etc/nginx/sites-available/${application_name}.conf
sudo ln -s /etc/nginx/sites-available/demo.conf /etc/nginx/sites-enabled/
sudo rm -rf /etc/nginx/sites-available/default

# Restart Nginx for the config to take effect
sudo service nginx restart > /dev/null


# --------------------------------------------------
# Node App Configuration
# --------------------------------------------------

#echo "Configuring and starting Node app."
#sudo -H -u ${safeuser_username} bash -c "pm2 start ${source_dir}/server.js --name \"${application_name}\" -i 0"
#sudo pm2 startup ubuntu -u $safeuser_username
#sudo -H -u ${safeuser_username} bash -c "pm2 save"


echo "Finished provisioning."
