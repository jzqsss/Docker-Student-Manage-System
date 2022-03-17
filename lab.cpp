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
    argparse::ArgumentParser program("program_name");
    
    program.add_argument("student_id");
    
    program.add_argument("--lab");
    
    program.add_argument("--ls")
      .default_value(false)
      .implicit_value(true);
    
    program.add_argument("--start")
      .default_value(false)
      .implicit_value(true);
    
    program.add_argument("--stop")
      .default_value(false)
      .implicit_value(true);
  
    try {
      program.parse_args(argc, argv);
    }
    catch (const std::runtime_error& err) {
      std::cerr << err.what() << std::endl;
      std::cerr << program;
      std::exit(1);
    }
    
    string lab_id;
    if (program["--start"] == true)
    {
         lab_id = program.get<std::string>("--lab");
    }

    auto student_id = program.get<std::string>("student_id");
    
    if (program["--ls"] == true) 
    {
        string input = "docker container ls -f name=" + student_id + " -a";
        string result = exec(input);
        cout << result;
    }
    else if(program["--start"] == true)
    {
        string input = "docker run -itd --name " + student_id + " " + lab_id;
        string result = exec(input);
        cout << result;
    }
    else if(program["--stop"] == true)
    {
        string input = "docker stop " + student_id;
        string result = exec(input);
        cout << result;
    }
    else
    {
        cout << "请输入正确的参数";
        return 0;
    }

    return 0;
}