import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  compareLogs(logFile1: string, logFile2: string) {
    console.log("compareLOGS");

    console.log("logFile1 = "+logFile1);
    // Split the response by line breaks to get individual JSON strings
    const lines = (logFile1 as string).trim().split('\n');
    // Parse each line to get JSON objects
    let parsedObjects = lines.map(line => JSON.parse(line));
    console.log(parsedObjects);
    const websiteObjects = parsedObjects.filter(obj => !('date' in obj));
    const dateObjects = parsedObjects.filter(obj => 'date' in obj);
    console.log("dateObjects = "+dateObjects[0].date);
    console.log("websiteObjects = "+websiteObjects);

    console.log("logFile2 = "+logFile2);
    // Split the response by line breaks to get individual JSON strings
    const lines2 = (logFile2 as string).trim().split('\n');
    // Parse each line to get JSON objects
    let parsedObjects2 = lines2.map(line2 => JSON.parse(line2));
    console.log(parsedObjects2);
    const websiteObjects2 = parsedObjects2.filter(obj2 => !('date' in obj2));
    const dateObjects2 = parsedObjects2.filter(obj2 => 'date' in obj2);
    console.log("dateObjects = "+dateObjects2[0].date);
    console.log("websiteObjects = "+websiteObjects2);


    let i = 0;
    let j = 0;
    let differences = []; // to record the differences

    if(websiteObjects.length == websiteObjects2.length){
      while(websiteObjects.length>i){

        console.log(websiteObjects[i]['urls'] + " compare to " +websiteObjects2[j]['urls']);
        if(websiteObjects[i]['urls'] == websiteObjects2[j]['urls']){
          console.log("OK");

          if(websiteObjects[i]['status'] == websiteObjects2[j]['status']){
            console.log("SAME: "+ websiteObjects[i]['urls']  + " is " + websiteObjects[i]['status'] + " and " + websiteObjects2[j]['urls'] + " is " + websiteObjects2[j]['status']);
          } else {
            differences.push({url: websiteObjects[i]['urls'], status1: websiteObjects[i]['status'], status2: websiteObjects2[j]['status']});
            console.log("NOT THE SAME: "+ websiteObjects[i]['url']  + " is " + websiteObjects[i]['status'] + " and " + websiteObjects2[j]['url'] + " is " + websiteObjects2[j]['status']);
          }
          console.log(i);
          i++;
          j=0;
        } else {
          console.log("NOT OK");
          j++;
        }
      }
    } else {
      console.log("File have different size so we can't check if the status is still the same after migration. Please choose the right file.")
    }

    if(differences.length==0){
      // let logs: { url: string; status1: string; status2: string; }[] = [{
      //   url: 'someUrl',
      //   status1: 'ok',
      //   status2: 'notOk'
      // }];
      differences.push({url: "No difference between the two files", status1: "OK", status2: "OK"});
    }

    return differences


    // let logFile1parse = this.parseLogsData(logFile1);
    // let logFile2parse = this.parseLogsData(logFile2);
    //
    // let i = 0;
    // let j = 0;
    //
    // let differences = []; // to record the differences
    //
    // console.log(logFile1parse);
    // console.log(logFile2parse);
    //
    // console.log("File 1");
    // logFile1parse.forEach(site => {
    //   console.log(site['id'] +": "+ site['url'] +": "+ site['status']);
    // });
    //
    // console.log("File 2");
    // logFile2parse.forEach(site => {
    //   console.log(site['id'] +": "+ site['url'] +": "+ site['status']);
    // });
    //
    // if(logFile1parse.length == logFile2parse.length){
    //   while(logFile1parse.length>i){
    //
    //     //console.log(logFile1parse[i]['url'] + " compare to " +logFile2parse[j]['url']);
    //     if(logFile1parse[i]['url'] == logFile2parse[j]['url']){
    //
    //       if(logFile1parse[i]['status'] == logFile2parse[j]['status']){
    //         console.log("SAME: "+ logFile1parse[i]['url']  + " is " + logFile1parse[i]['status'] + " and " + logFile2parse[j]['url'] + " is " + logFile2parse[j]['status']);
    //       } else {
    //         differences.push({url: logFile1parse[i]['url'], status1: logFile1parse[i]['status'], status2: logFile2parse[j]['status']});
    //         console.log("NOT THE SAME: "+ logFile1parse[i]['url']  + " is " + logFile1parse[i]['status'] + " and " + logFile2parse[j]['url'] + " is " + logFile2parse[j]['status']);
    //       }
    //       console.log(i);
    //       i++;
    //       j=0;
    //     } else {
    //       j++;
    //     }
    //   }
    // } else {
    //   console.log("File have different size so we can't check if the status is still the same after migration. Please choose the right file.")
    // }
    // return differences;
  }

  exportDifferencesToExcel({differences}: { differences: any }) {
    let ws = XLSX.utils.json_to_sheet(differences);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Differences");
    XLSX.writeFile(wb, 'differences.xlsx');
  }

  parseLogsData(data: string) {
    const logs = [];
    const lines = data.split('\n');

    for (let line of lines) {
      if (line.startsWith('info:')) {
        let lineUpdate = this.removeWordFromLine(line, 'info: ');
        const logEntry: { [key: string]: string } = {}; // Ajoutez une signature d'index à l'objet
        const fields = lineUpdate.split(',');

        for (let field of fields) {
          const [key, value] = field.trim().split(':');

          if (key === 'url') {
            // Get the full URL by joining all parts after the 'url:' key
            logEntry[key] = field.substring(field.indexOf(':') + 1).trim();
          } else {
            logEntry[key] = value.trim();
          }
        }

        logs.push(logEntry);
      }
    }

    return logs;
  }

  removeWordFromLine(line: string, word: string): string {
    // Utilisation d'une expression régulière avec le flag 'g' pour supprimer toutes les occurrences du mot
    const regex = new RegExp('\\b' + word + '\\b', 'g');

    // Utilisation de la méthode replace pour remplacer le mot par une chaîne vide
    const updatedLine = line.replace(regex, '');

    return updatedLine;
  }

}
