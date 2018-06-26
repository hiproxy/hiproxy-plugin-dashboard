let snippets = [
    // block
    {
        label: 'domain',
        value: [
            'domain ${1:hiproxy.org} {',
            '\tlocation ${2:/} {',
            '\t\t$0',
            '\t}',
            '}'
        ].join('\n')
    },
    {
        label: 'location',
        value: [
            'location ${1:/} {',
            '\t$0',
            '}'
        ].join('\n')
    },
    // directives
    {
        label: 'set',
        value: 'set \$${1:name} ${2:value};'
    },
    {
        label: 'proxy_set_header',
        value: 'proxy_set_header ${1:key} ${2:value};'
    },
    {
        label: 'proxy_hide_header',
        value: 'proxy_hide_header ${1:key};'
    },
    {
        label: 'proxy_set_cookie',
        value: 'proxy_set_cookie ${1:key} ${2:value};'
    },
    {
        label: 'proxy_hide_cookie',
        value: 'proxy_hide_cookie ${1:key};'
    },
    {
        label: 'proxy_method',
        value: 'proxy_method ${0:POST};'
    },
    {
        label: 'proxy_set_body',
        value: 'proxy_set_body "${0:a=1&b=2&c=3}";'
    },
    {
        label: 'proxy_append_body',
        value: 'proxy_append_body "${0:d=4}";'
    },
    {
        label: 'proxy_replace_body',
        value: 'proxy_replace_body "${1:d=4}" "${2:d=5}";'
    },
    {
        label: 'status',
        value: 'status ${1:477} "${2:Authentication failed}";'
    },
    {
      label: 'set_header',
      value: 'set_header ${1:key} ${2:value};'
    },
    {
        label: 'hide_header',
        value: 'hide_header ${1:key};'
    },
    {
      label: 'set_cookie',
      value: 'set_cookie ${1:key} ${2:value};'
    },
    {
        label: 'hide_cookie',
        value: 'hide_cookie ${1:key};'
    },
    {
        label: 'send_file',
        value: 'send_file ${1:/site/index.html};'
    },
    {
        label: 'echo',
        value: 'echo ${1:<h1>hello_echo</h1>};'
    },
    {
        label: 'ssl_certificate',
        value: 'ssl_certificate ${1:/user/root/.hiproxy/cert/example.crt};'
    },
    {
        label: 'ssl_certificate_key',
        value: 'ssl_certificate_key ${1:/user/root/.hiproxy/cert/example.key};'
    },
    {
        label: 'proxy_pass',
        value: 'proxy_pass ${1:http://some.example.com/some/path/};'
    },
    {
        label: 'alias',
        value: 'alias ${1:/Users/root/some/path/};'
    },
    {
        label: 'root',
        value: 'root ${1:index.html};'
    },
  ];
  
  // Register a new language
  monaco.languages.register({ id: 'hiproxy-conf' });
  
  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider('hiproxy-conf', {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',
  
  directives: [
    // Global Directives
    'set',
    // Request Directives
    'proxy_set_header', 'proxy_hide_header', 'proxy_set_cookie', 'proxy_hide_cookie', 'proxy_method', 'proxy_set_body', 'proxy_append_body', 'proxy_replace_body', 
    // Response directives
    'status', 'set_header', 'hide_header', 'set_cookie', 'hide_cookie', 'send_file', 'echo',
    // Directives in domain
    'ssl_certificate', 'ssl_certificate_key',
    // Directives in location
    'proxy_pass', 'alias', 'root'
  ],
  
  operators: [
    '=', '~'
  ],
  
  // we include these common regular expressions
  symbols:  /[=><!~?:&|+\-*\/\^%]+/,
  
  // C# style strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // variables
      [/\$\w+/, 'variable'],
  
      // domain block
      [/([\w\._]+)(\s+=>\s*\{)/, ['domain-value', '']], 
      [/(domain\s+)([\w\._]+)(?=\s+\{)/, ['domain', 'domain-value']],
  
      // location block
      [/(location\s+)([^{]+)(?=\s+\{)/, ['location', 'location-value']],                                                                                      
      
      // identifiers and keywords
      [/[a-z_$][\w$]*/, { cases: { '@directives': 'directive',
                                   '@default': 'identifier' } }],
  
      // whitespace
      { include: '@whitespace' },
  
      // delimiters and operators
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [/@symbols/, { cases: { '@operators': 'operator',
                              '@default'  : '' } } ],
  
      // @ annotations.
      // As an example, we emit a debugging log message on these tokens.
      // Note: message are supressed during the first load -- change some lines to see them.
      [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],
  
      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],
  
      // delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],
  
      // strings
      [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
      [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
  
      // characters
      [/'[^\\']+'/, 'string'],
      [/(')(@escapes)(')/, ['string','string.escape','string']],
      [/'/, 'string.invalid'],
    ],
  
    comment: [
      [/#.*/, 'comment' ]
    ],
  
    string: [
      [/[^\\"]+/,  'string'],
      [/@escapes/, 'string.escape'],
      [/\\./,      'string.escape.invalid'],
      [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
    ],
  
    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/#.*/,    'comment'],
    ],
  },
  });
  
  // Define a new theme that constains only rules that match this language
  monaco.editor.defineTheme('myCoolTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
    { token: 'directive', foreground: 'c586c0' },
    { token: 'variable', foreground: '4ec9b0' },
    { token: 'internal-variable', foreground: '4ec9b0' },
    { token: 'domain', foreground: '569cd6' },
    { token: 'location', foreground: '569cd6' },
    { token: 'domain-value', foreground: 'dcdcaa', fontStyle: 'bold' },
    { token: 'location-value', foreground: 'dcdcaa', fontStyle: 'bold' },
    { token: 'comment', foreground: '808080' },
  ]
  });
  
  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider('hiproxy-conf', {
  provideCompletionItems: () => {
        let keywordsItems = [
          // 
        ].map(item => {
            return {
                label: item,
                kind: monaco.languages.CompletionItemKind.Keyword
            }
        });
        let snippetItems = snippets.map(item => {
            let {label, value} = item;
            return {
                label,
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: {
                    value
                }
            }
        });
        return snippetItems.concat(keywordsItems);
  }
  });
  
  monaco.languages.setLanguageConfiguration("hiproxy-conf", {
      comments: {
          lineComment: '#'
      },
      brackets: [['{', '}']],
      autoClosingPairs: [
          {open: '"', close: '"', notIn: ['string', 'comment']},
          {open: '\'', close: '\'', notIn: ['string', 'comment']},
          {open: '{', close: '}', notIn: ['string', 'comment']}
      ],
  })
  
  monaco.editor.create(document.getElementById("container"), {
  theme: 'myCoolTheme',
  value: getCode(),
  language: 'hiproxy-conf'
  });
  
  function getCode() {
  return `set $domain api.hiproxy.org;
  set $local 127.0.0.1:8800;
  set $api api;
  set $test $api.example.com;
  set $id 1234567;
  
  domain a.b.com {
    location / {
        echo "abc";
    }
  }
  
  # standard rewrite url
  $domain => {
    proxy_pass http://$local/api/mock/;
    set $id 1234;
    set $mock_user user_$id;
    set_header Host $domain;
    set_header UserID $mock_user;
    set_header Access-Control-Allow-Origin *;
  }
  
  blog.hiproxy.org => {
    set_header Access-Control-Allow-Origin *;
  
    set $node_server 127.0.0.1:3008;
    set $order order;
    set $cookie1 login=true;expires=20160909;
  
    location /$api/$order/detail {
      proxy_pass http://$node_server/user/?domain=$domain;
      set_header Set-Cookie userID 200908204140;
    }
  
    location ~ /(usercenter|userinfo)/ {
      set $cookie login=true;expires=20180808;
      set $id 56789;
  
      proxy_pass http://127.0.0.1:3008/info/;
  
      set_cookie userID 200908204140;
      set_cookie userName user_$id;
    }
  
    location ~ /local/(.*)(\?(.*))? {
      send_file ./mock/$1.json;
    }
  
    location /dev {
      #alias /site/path/;
      alias ./src/view/;
      root app.html
    }
  
    location /multiple {
      echo '<h1>hello_echo</h1>';
      echo "<p>test echo directive</p>";
      echo <p>finish</p>;
    }
  }`
  }
  