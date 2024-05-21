header('Content-Type: text/calendar');
header('Content-Disposition: attachment; filename="test.ics"');
readfile('test.ics');
exit;
