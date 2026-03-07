<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #6f0ec3; -webkit-text-stroke: #6f0ec3}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #4d5055; -webkit-text-stroke: #4d5055}
    p.p3 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #18702b; -webkit-text-stroke: #18702b}
    p.p4 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; -webkit-text-stroke: #000000}
    p.p5 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; -webkit-text-stroke: #000000; min-height: 16.0px}
    span.s1 {font-kerning: none; background-color: #ecf1f7}
    span.s2 {font-kerning: none; color: #000000; background-color: #ecf1f7; -webkit-text-stroke: 0px #000000}
    span.s3 {font-kerning: none; color: #6f0ec3; background-color: #ecf1f7; -webkit-text-stroke: 0px #6f0ec3}
    span.s4 {font-kerning: none}
    span.s5 {font-kerning: none; color: #18702b; background-color: #ecf1f7; -webkit-text-stroke: 0px #18702b}
    span.s6 {font-kerning: none; color: #a4450b; background-color: #ecf1f7; -webkit-text-stroke: 0px #a4450b}
    span.s7 {font-kerning: none; color: #0e6e6d; background-color: #ecf1f7; -webkit-text-stroke: 0px #0e6e6d}
  </style>
</head>
<body>
<p class="p1"><span class="s1">export</span><span class="s2"> </span><span class="s1">default</span><span class="s2"> </span><span class="s1">async</span><span class="s2"> </span><span class="s1">function</span><span class="s2"> handler(req, res) {</span></p>
<p class="p2"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">// 1. Set generous CORS headers just in case</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">    </span>res.setHeader(</span><span class="s1">'Access-Control-Allow-Credentials'</span><span class="s2">, </span><span class="s3">true</span><span class="s2">);</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">    </span>res.setHeader(</span><span class="s1">'Access-Control-Allow-Origin'</span><span class="s2">, </span><span class="s1">'*'</span><span class="s2">);</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">    </span>res.setHeader(</span><span class="s1">'Access-Control-Allow-Methods'</span><span class="s2">, </span><span class="s1">'GET,OPTIONS'</span><span class="s2">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>res.setHeader(</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">        </span></span><span class="s1">'Access-Control-Allow-Headers'</span><span class="s2">,</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">        </span></span><span class="s1">'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>);</span></p>
<p class="p5"><span class="s4"></span><br></p>
<p class="p2"><span class="s2"><span class="Apple-converted-space">    </span></span><span class="s1">// Respond immediately to OPTIONS preflight requests</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span></span><span class="s3">if</span><span class="s1"> (req.method === </span><span class="s5">'OPTIONS'</span><span class="s1">) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>res.status(</span><span class="s6">200</span><span class="s1">).end();</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">return</span><span class="s1">;</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p5"><span class="s4"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span></span><span class="s3">try</span><span class="s1"> {</span></p>
<p class="p2"><span class="s2"><span class="Apple-converted-space">        </span></span><span class="s1">// 2. Fetch directly from the Official Oref API</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">        </span></span><span class="s3">const</span><span class="s2"> response = </span><span class="s3">await</span><span class="s2"> fetch(</span><span class="s1">'https://www.oref.org.il/WarningMessages/alert/alerts.json'</span><span class="s2">, {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>method: </span><span class="s5">'GET'</span><span class="s1">,</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>headers: {</span></p>
<p class="p2"><span class="s2"><span class="Apple-converted-space">                </span></span><span class="s1">// We mimic a standard browser to prevent Oref's WAF (Web Application Firewall) from blocking us</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">                </span></span><span class="s1">'User-Agent'</span><span class="s2">: </span><span class="s1">'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'</span><span class="s2">,</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">                </span></span><span class="s1">'Accept'</span><span class="s2">: </span><span class="s1">'application/json, text/plain, */*'</span><span class="s2">,</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">                </span></span><span class="s1">'Referer'</span><span class="s2">: </span><span class="s1">'https://www.oref.org.il/'</span><span class="s2">,</span></p>
<p class="p3"><span class="s2"><span class="Apple-converted-space">                </span></span><span class="s1">'X-Requested-With'</span><span class="s2">: </span><span class="s1">'XMLHttpRequest'</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span>}</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>});</span></p>
<p class="p5"><span class="s4"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">if</span><span class="s1"> (!response.ok) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">throw</span><span class="s1"> </span><span class="s3">new</span><span class="s1"> </span><span class="s7">Error</span><span class="s1">(</span><span class="s5">`Oref responded with status: </span><span class="s1">${response.status}</span><span class="s5">`</span><span class="s1">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p5"><span class="s4"></span><br></p>
<p class="p2"><span class="s2"><span class="Apple-converted-space">        </span></span><span class="s1">// 3. Process the Response</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">const</span><span class="s1"> textData = </span><span class="s3">await</span><span class="s1"> response.text();</span></p>
<p class="p5"><span class="s1"><span class="Apple-converted-space">        </span></span></p>
<p class="p2"><span class="s2"><span class="Apple-converted-space">        </span></span><span class="s1">// If the response is empty (no active alerts), return an empty string gracefully</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">if</span><span class="s1"> (!textData || textData.trim() === </span><span class="s5">''</span><span class="s1">) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">            </span></span><span class="s3">return</span><span class="s1"> res.status(</span><span class="s6">200</span><span class="s1">).send(</span><span class="s5">''</span><span class="s1">);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>
<p class="p5"><span class="s1"><span class="Apple-converted-space">        </span></span></p>
<p class="p2"><span class="s2"><span class="Apple-converted-space">        </span></span><span class="s1">// Otherwise, parse and forward the JSON payload</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">const</span><span class="s1"> jsonData = </span><span class="s7">JSON</span><span class="s1">.parse(textData);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">return</span><span class="s1"> res.status(</span><span class="s6">200</span><span class="s1">).json(jsonData);</span></p>
<p class="p5"><span class="s4"></span><br></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>} </span><span class="s3">catch</span><span class="s1"> (error) {</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span>console.error(</span><span class="s5">'Proxy Error:'</span><span class="s1">, error);</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">        </span></span><span class="s3">return</span><span class="s1"> res.status(</span><span class="s6">500</span><span class="s1">).json({ error: </span><span class="s5">'Failed to fetch Oref data'</span><span class="s1">, details: error.message });</span></p>
<p class="p4"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>
<p class="p4"><span class="s1">}</span></p>
</body>
</html>
