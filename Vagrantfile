# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty64" # ubuntu 14.04

  # Enable the Puppet provisioner, with will look in manifests
  config.vm.provision "shell", path: "provision/setup.sh"

  config.vm.synced_folder ".", "/vagrant", :owner => "www-data", :mount_options => ["dmode=777","fmode=777", "umask=0000","dmask=0000","fmask=0000"]
  config.vm.network :private_network, ip: "192.168.250.250" # dedicated private IP to this local machine
end
