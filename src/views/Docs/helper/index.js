import { transFormEndpoint } from 'utils';

export const langTransformer = ({
  data = {},
  lang = 'fetch',
  instanceZUID = '',
  token = '',
  isLoggedIn = false,
}) => {
  const hasFormData = data?.request?.body?.mode === 'formdata' ? true : false;
  const hasToken = data?.request?.auth?.type === 'bearer' ? true : false;
  const hasBody =
    data?.request?.body?.mode === 'raw' && data?.request?.body?.raw
      ? true
      : false;
  const headers = [
    {
      key: 'Content-Type',
      value: 'application/json',
    },
  ];

  (hasToken || token) &&
    headers.push({
      key: 'Authorization',
      value: `Bearer ${token || 'YOUR_API_KEY'}`,
    });

  const responseData = data.response ? `${data?.response[0]?.body}` : `{}`;

  const langSwitcher = (lang) => {
    switch (lang) {
      case 'Javascript':
        return fetchRequest;
      case 'Golang':
        return goRequest;
      default:
        return fetchRequest;
    }
  };

  const getBody = (data) => {
    switch (data?.request?.body?.mode) {
      case 'formdata':
        return `
  const body = new FormData();
  ${
    hasFormData
      ? data.request.body.formdata
          .map((e) => {
            return `body.append('${e.key}', '${e.value}')\n`;
          })
          .join('  ')
      : ''
  }
      `;
      case 'raw':
        return `const body = ${data?.request?.body?.raw}`;
      default:
        return ``;
    }
  };
  const rawEndpoint = data?.request?.url?.raw || data?.request?.url;
  const { endpoint } = transFormEndpoint({
    url: rawEndpoint,
    instanceZUID,
    isLoggedIn,
  });

  const fetchRequest = `
  const request = async () => {
  const endpoint = '${endpoint}'
  ${getBody(data)}
  const res = await fetch(endpoint, {
    method: '${data.request.method}',
    headers: {
      ${headers
        .map((e) => {
          return `${e.key} : '${e.value}'\n`;
        })
        .join('      ')}
    },
    ${data.request.body ? 'body: JSON.stringify(body)' : '\0'}
  })
  const data = await res.json();
  return data;
}
  `;

  const getGobody = hasBody
    ? "var data = strings.NewReader('${data?.request?.body?.raw}')"
    : '\0';
  const goRequest = `
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
)
func main() {
	client := &http.Client{}
  ${getGobody}
	req, err := http.NewRequest('${data.request.method}', '${endpoint}' ${
    hasBody ? ',data' : 'nil'
  })
	req, err := http.NewRequest('${data.request.method}', '${endpoint}' ${
    hasBody ? ',data' : 'nil'
  })
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Origin", "http://fiddle.jshell.net")
	// req.Header.Set("Accept-Encoding", "gzip, deflate")
	req.Header.Set("Accept-Language", "en-US,en;q=0.8")
	req.Header.Set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.Header.Set("Accept", "*/*")
	req.Header.Set("Referer", "http://fiddle.jshell.net/_display/")
	req.Header.Set("X-Requested-With", "XMLHttpRequest")
	req.Header.Set("Connection", "keep-alive")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", bodyText)
}
  `;
  return { request: langSwitcher(lang), response: responseData };
};

// todo convert to recursive FN //
export const transFormMainData = (mainCollection) => {
  mainCollection = mainCollection.map((e) => {
    return {
      ...e,
      // parent: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}`,
      // url: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}`,
      parent: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}/api-reference`,
      url: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}/api-reference`,
    };
  });

  // const test2 = (data, parent = null, base = null) => { (data?.item || data)?.forEach((e) => {
  //     if (e.request && e.name) {
  //       return (e['testt'] = `${}${parent}/#${e.name}`);
  //     } else if (e.item || e.name) {
  //       e['testt'] = `${parent}${e.name}`;
  //       return test2(e.item, e.name, data.name);
  //     } else if (e.name) {
  //     }
  //   });
  // };
  // console.log(test2(mainCollection, null, null), 77777777);

  // console.log(mainCollection, 7777);
  const newCollection = mainCollection?.map((e) => {
    const res = e.item.map((q) => {
      if (q.request) {
        return {
          ...q,
          parent: e.parent || e.name,
          url: e.parent + '/#' + q.name.replaceAll(' ', '-'),
        };
      }

      return { ...q, parent: e.parent || e.name, url: e.parent + q.name };
    });
    return { ...e, item: res };
  });

  const newColletion1 = newCollection.map((e) => {
    const res = e.item.map((q) => {
      const res2 = q?.item?.map((w) => {
        if (w.request) {
          return {
            ...w,
            parent: q.name,
            url: `${e.parent}${q.name}/#${w.name.replaceAll(' ', '-')}`,
          };
        }
        return { ...w, parent: q.name, url: e.parent + w.name };
      });
      return { ...q, item: res2 };
    });
    return { ...e, item: res };
  });

  const result = newColletion1.map((e) => {
    const res = e.item.map((q) => {
      const res2 = q?.item?.map((w) => {
        const res3 = w?.item?.map((y) => {
          return {
            ...y,
            parent: w?.name,
            url: e.parent + `${w.name}/#${y.name.replaceAll(' ', '-')}`,
          };
        });
        return { ...w, item: res3 };
      });
      return { ...q, item: res2 };
    });
    return { ...e, item: res };
  });
  return result;
};

export const makeTree = (data) => {
  const base = { children: [] };

  for (const node of data) {
    const path = node.name.match(/\/[^\/]+/g);
    let curr = base;

    path.forEach((e, i) => {
      const currPath = path.slice(0, i + 1).join('');
      const child = curr.children.find((e) => e.name === currPath);

      if (child) {
        curr = child;
      } else {
        curr.children.push({
          ...node,
          id: Math.random() * 9,
          name: currPath,
          children: [],
          url: currPath,
        });
        curr = curr.children[curr.children.length - 1];
      }
    });
  }

  return base.children;
};
export const transFormMainDataMedia = (mainCollection) => {
  mainCollection = mainCollection.map((e) => {
    return {
      ...e,
      // parent: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}`,
      // url: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}`,
      parent: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}/api-reference`,
      url: `/${e?.info?.name?.split(' ')[0]?.toLowerCase()}/api-reference`,
    };
  });

  // const test2 = (data, parent = null, base = null) => { (data?.item || data)?.forEach((e) => {
  //     if (e.request && e.name) {
  //       return (e['testt'] = `${}${parent}/#${e.name}`);
  //     } else if (e.item || e.name) {
  //       e['testt'] = `${parent}${e.name}`;
  //       return test2(e.item, e.name, data.name);
  //     } else if (e.name) {
  //     }
  //   });
  // };
  // console.log(test2(mainCollection, null, null), 77777777);

  // console.log(mainCollection, 7777);
  const newCollection = mainCollection?.map((e) => {
    const res = e.item.map((q) => {
      if (q.request) {
        return {
          ...q,
          parent: e.parent || e.name,
          url: e.parent + '/#' + q.name.replaceAll(' ', '-')?.toLowerCase(),
        };
      }

      return {
        ...q,
        parent: e.parent || e.name,
        url: e.parent + '/' + q?.name?.toLowerCase(),
      };
    });
    return { ...e, item: res };
  });

  const newColletion1 = newCollection.map((e) => {
    const res = e.item.map((q) => {
      const res2 = q?.item?.map((w) => {
        if (w.request) {
          return {
            ...w,
            parent: q.name,
            url: `${e.parent}${q?.name?.toLowerCase()}/#${w.name.replaceAll(
              ' ',
              '-',
            )}`,
          };
        }
        return {
          ...w,
          parent: q.name,
          url: e.parent + '/' + w?.name?.toLowerCase(),
        };
      });
      return { ...q, item: res2 };
    });
    return { ...e, item: res };
  });

  const result = newColletion1.map((e) => {
    const res = e.item.map((q) => {
      const res2 = q?.item?.map((w) => {
        const res3 = w?.item?.map((y) => {
          return {
            ...y,
            parent: '/' + w?.name,
            url:
              e.parent +
              `${w.name.toLowerCase()}/#${y.name.replaceAll(' ', '-')}`,
          };
        });
        return { ...w, item: res3 };
      });
      return { ...q, item: res2 };
    });
    return { ...e, item: res };
  });
  return result;
};
