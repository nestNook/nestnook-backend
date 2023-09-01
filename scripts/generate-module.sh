#!/bin/bash

if [ $# -eq 0 ]; then
  echo "No module name provided. Usage: $0 <module_name>"
  exit 1
fi

base_module_name=$1

module_path="src/modules/$base_module_name"

controllers="/controllers"
services="/services"
repositories="/repositories"
routers="/routers"

base_controllers_path="$module_path$controllers"
base_services_path="$module_path$services"
base_repositories_path="$module_path$repositories"
base_routers_path="$module_path$routers"

mkdir -p $module_path

mkdir -p "$base_controllers_path"
mkdir -p "$base_services_path"
mkdir -p "$base_repositories_path"
mkdir -p "$base_routers_path"

base_file_name=$(echo "$base_module_name" | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g' | sed 's/ //g')


export_class="export class "
export_interface="export interface "


######################################################################


echo "Generating controller"

# Contents

controller_interface_name="$base_file_name"
controller_interface_name+="ControllerInterface"

controller_interface="$export_interface"
controller_interface+="$controller_interface_name"
controller_interface+=" {}"

controllerClass="import { $controller_interface_name } from './$base_module_name.controller.interface';\n\n"
controllerClass+="$export_class$base_file_name"
controllerClass+="Controller implements $controller_interface_name {}"

# Files
controllerClassFile=$base_controllers_path
controllerClassFile+="/"
controllerClassFile+="$base_module_name"
controllerClassFile+=".controller.ts"

controllerInterfaceFile=$base_controllers_path
controllerInterfaceFile+="/"
controllerInterfaceFile+="$base_module_name"
controllerInterfaceFile+=".controller.interface.ts"


echo -e $controllerClass > $controllerClassFile
echo -e $controller_interface > $controllerInterfaceFile


######################################################################


echo "Generating service"

service_interface_name="$base_file_name"
service_interface_name+="ServiceInterface"

service_interface="$export_interface"
service_interface+="$service_interface_name"
service_interface+=" {}"

serviceClass="import { $service_interface_name } from './$base_module_name.service.interface';\n\n"
serviceClass+="$export_class$base_file_name"
serviceClass+="Service implements $service_interface_name {}"

# File

serviceClassFile=$base_services_path
serviceClassFile+="/"
serviceClassFile+="$base_module_name"
serviceClassFile+=".service.ts"

serviceInterfaceFile=$base_services_path
serviceInterfaceFile+="/"
serviceInterfaceFile+="$base_module_name"
serviceInterfaceFile+=".service.interface.ts"

echo -e $serviceClass > $serviceClassFile
echo -e $service_interface > $serviceInterfaceFile


######################################################################


echo "Generating repository"


repositoryInterface="$export_interface$base_file_name"
repositoryInterface+="RepositoryInterface {}"


repositoryClass="$export_class$base_file_name"
repositoryClass+="Repository {}"

repositoryClassFile=$base_repositories_path
repositoryClassFile+="/"
repositoryClassFile+="$base_module_name"
repositoryClassFile+=".repository.ts"

repositoryInterfaceFile=$base_repositories_path
repositoryInterfaceFile+="/"
repositoryInterfaceFile+="$base_module_name"
repositoryInterfaceFile+=".repository.interface.ts"

echo $repositoryClass > $repositoryClassFile
echo $repositoryInterface > $repositoryInterfaceFile


######################################################################


echo "Generating router"

routerClass="import { BaseRouter } from '../../../common/baseRouter.interface';\n\n"
routerClass+="$export_class$base_file_name"
routerClass+="Router implements BaseRouter {}"

routerClassFile=$base_routers_path
routerClassFile+="/"
routerClassFile+="$base_module_name"
routerClassFile+=".router.ts"

echo -e $routerClass > $routerClassFile


######################################################################


echo "Generating module file"

moduleFile=$module_path
moduleFile+="/"
moduleFile+=$base_module_name
moduleFile+=".module.ts"

moduleClass="import { BaseModule } from '../../common/baseModule';\n\n"
moduleClass+="$export_class$base_file_name"
moduleClass+="Module implements BaseModule {}"

echo -e $moduleClass > $moduleFile


######################################################################


echo "Module generated"
