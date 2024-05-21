header('Content-Type: text/calendar');
header('Content-Disposition: attachment; filename="filename.ics"');
readfile('path/to/yourfile.ics');
exit;
