#include<stdio.h>
#include<iostream>
#include <stdlib.h>
#include <stdexcept>
#include <string>
#include<unistd.h>

#include "argparse.hpp"

using namespace std;

extern int optind,opterr,optopt;
extern char *optarg;

string exec(string command) {
   char buffer[128];
   string result = "";

   // Open pipe to file
   FILE* pipe = popen(command.c_str(), "r");
   if (!pipe) {
      return "popen failed!";
   }

   // read till end of process:
   while (!feof(pipe)) {
      // use buffer to read and add to result
      if (fgets(buffer, 128, pipe) != NULL)
         result += buffer;
   }

   pclose(pipe);
   return result;
}

int main(int argc,char *argv[]){
    argparse::ArgumentParser program("lab");
    
    program.add_argument("action");
    
    program.add_argument("--lab");
    program.add_argument("--image");
  
    try {
      program.parse_args(argc, argv);
    }
    catch (const std::runtime_error& err) {
      std::cerr << err.what() << std::endl;
      std::cerr << program;
      std::exit(1);
    }

    auto action = program.get<std::string>("action");

    if (action == "ls") {
        auto lab = program.get<std::string>("--lab");

        string input = "docker container ls -f name=" + lab + " -a";
        string result = exec(input);
        cout << result;
    } else if (action == "start") {
        auto lab = program.get<std::string>("--lab");
        auto image = program.get<std::string>("--image");

        string input = "docker run -itd --name " + lab + " " + image;
        string result = exec(input);
        cout << result;
    } else if (action == "stop") {
        auto lab = program.get<std::string>("--lab");
        
        string input = "docker stop " + lab;
        string result = exec(input);
        cout << result;
    } else {
        cout << "请输入正确的参数";
        return 0;
    }

    return 0;
}